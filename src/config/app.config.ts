import { registerAs } from '@nestjs/config';

enum Environment {
  Development = 'development',
  Production = 'production',
}

// validate config

export default registerAs(
  'app',
  (): Record<string, any> => ({
    port: process.env?.HTTP_PORT,
    env: process.env.NODE_ENV || 'development',
  }),
);
