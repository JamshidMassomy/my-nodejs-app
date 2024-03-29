import { registerAs } from '@nestjs/config';

export default registerAs(
  'jwt',
  (): Record<string, any> => ({
    expires: process.env?.AUTH_JWT_ACCESS_TOKEN_EXPIRED,
    secret: process.env?.AUTH_JWT_ACCESS_TOKEN_SECRET_KEY,
  }),
);
