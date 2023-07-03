import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    type: process.env.DATABASE_TYPE as any,
    host: process.env?.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    name: process.env?.DATABASE_NAME,
    username: process.env?.DATABASE_USER,
    password: process?.env.DATABASE_PASSWORD,
    debug: process.env.DATABASE_DEBUG === 'true',
    options: process.env?.DATABASE_OPTIONS,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: process.env?.DATABASE_SYNCHRONIZE === 'true',
  }),
);
