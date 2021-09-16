import { SetMetadata } from '@nestjs/common';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager',
  BLOGGER = 'blogger',
}

export const ROLES_KEY = 'roles';
export const hasRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
