import { UserRole } from '@prisma/client';

export interface JwtUser {
  sub: string;
  name: string;
  role: UserRole;
}
