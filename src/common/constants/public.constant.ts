import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/** =================JWT=================== */
export const JWT_SECRET_KEY = 'jwt.secret';
export const JWT_EXPIRE_KEY = 'jwt.expires';
