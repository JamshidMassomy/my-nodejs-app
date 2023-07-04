import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { AppConfigModule } from 'src/config/config.module';
import { WhitelistMiddleware } from 'src/common/middleware/white_list.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AppAuthGuard } from 'src/common/gaurd/app.gaurd';
import { JwtService } from '@nestjs/jwt';

// import { APP_GUARD } from '@nestjs/core';
// import { AppAuthGuard } from './common/gaurd/jwt.gaurd';
// import { JwtModule } from '@nestjs/jwt';
// import { WhitelistMiddleware } from './common/middleware/white_list.middleware';

@Module({
  imports: [AuthModule, UserModule, AppConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AppAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(WhitelistMiddleware)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
  }
}
