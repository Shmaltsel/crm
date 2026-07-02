import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

const isProd = process.env.NODE_ENV === 'production';

function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
  csrfToken: string,
) {
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    path: '/auth',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.cookie('csrf_token', csrfToken, {
    httpOnly: false,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() signInDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, user } = await this.authService.login(
      signInDto.email,
      signInDto.password,
      { ip: req.ip, userAgent: req.headers['user-agent'] },
    );
    const csrfToken = randomBytes(32).toString('hex');

    setAuthCookies(res, access_token, refresh_token, csrfToken);

    return { user };
  }

  @Throttle({ default: { ttl: 60000, limit: 20 } })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const oldToken = req.cookies?.refresh_token;
    if (!oldToken) throw new UnauthorizedException('Refresh token відсутній');

    const { access_token, refresh_token, user } =
      await this.authService.refresh(oldToken, {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
      });
    const csrfToken = randomBytes(32).toString('hex');

    setAuthCookies(res, access_token, refresh_token, csrfToken);

    return { user };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: Request) {
    const payload = req['user'] as {
      sub: string;
      email: string;
      role: string;
      name: string;
    };
    return {
      user: {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      },
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (refreshToken) await this.authService.revokeRefreshToken(refreshToken);

    res.clearCookie('access_token');
    res.clearCookie('refresh_token', { path: '/auth' });
    res.clearCookie('csrf_token');
    return { message: 'ok' };
  }
}
