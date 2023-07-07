import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  SWAGGER_DESCRIPTION,
  SWAGGER_TITLE,
  SWAGGER_VERSION,
} from './common/constants/swagger.constant';
import { API_PREFIX } from './common/constants/public.constant';
import { CustomValidationPipe } from './common/pipe/validation.pipe';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const logger = new Logger();
async function bootstrap(): Promise<void> {
  logger.log('=========== Starting API ============');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('app.port');
  const env: string = configService.get<string>('app.env');

  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(new CustomValidationPipe());

  // tests
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(API_PREFIX, app, document);
  await app.listen(port);
  logger.log(`NodeJs environment: ${env}`);
  logger.log(`MyNestJs app is running on port: ${port}`);
}
bootstrap();
