import { Injectable, HttpStatus } from '@nestjs/common';
import { AppException } from '../common/exceptions/app.exception';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomBytes, createHash } from 'crypto';

const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private async issueRefreshToken(
    userId: string,
    meta: { ip?: string; userAgent?: string },
  ): Promise<string> {
    const token = randomBytes(64).toString('hex');
    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash: this.hashToken(token),
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_MS),
        ip: meta.ip,
        userAgent: meta.userAgent,
      },
    });
    return token;
  }

  private readonly dummyHash =
    '$2b$10$CwTycUXWue0Thq9StjUM0uJ8lm7zqBWkD3hAvQi.jGjPUB0.wERYS';

  async login(
    email: string,
    pass: string,
    meta: { ip?: string; userAgent?: string } = {},
  ) {
    const user = await this.usersService.findByEmailWithCity(email);

    const isPasswordValid = await bcrypt.compare(
      pass,
      user?.password ?? this.dummyHash,
    );

    if (!user || !isPasswordValid) {
      throw new AppException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      cityId: user.cityId,
      cityName: user.city?.name,
    };

    const refresh_token = await this.issueRefreshToken(user.id, meta);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        cityId: user.cityId,
        cityName: user.city?.name,
      },
    };
  }

  async refresh(
    oldToken: string,
    meta: { ip?: string; userAgent?: string } = {},
  ) {
    const tokenHash = this.hashToken(oldToken);
    const stored = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: { include: { city: true } } },
    });

    if (!stored || stored.revokedAt || stored.expiresAt < new Date()) {
      throw new AppException('INVALID_REFRESH_TOKEN', HttpStatus.UNAUTHORIZED);
    }

    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date() },
    });

    const payload = {
      sub: stored.user.id,
      email: stored.user.email,
      role: stored.user.role,
      name: stored.user.name,
      cityId: stored.user.cityId,
      cityName: stored.user.city?.name,
    };

    const refresh_token = await this.issueRefreshToken(stored.user.id, meta);

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token,
      user: {
        id: stored.user.id,
        name: stored.user.name,
        email: stored.user.email,
        role: stored.user.role,
        cityId: stored.user.cityId,
        cityName: stored.user.city?.name,
      },
    };
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken
      .update({
        where: { tokenHash: this.hashToken(token) },
        data: { revokedAt: new Date() },
      })
      .catch(() => undefined);
  }
}
