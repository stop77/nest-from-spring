import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../../entities/User';

export type AllowedRole = UserRoleEnum.USER | UserRoleEnum.ADMIN;

export const Roles = (roles: AllowedRole[]) => SetMetadata('roles', roles);
