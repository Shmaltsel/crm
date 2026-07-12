import { UserRole } from '@prisma/client';

export interface JwtUser {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
  cityId?: string | null;
}
