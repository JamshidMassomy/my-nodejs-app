import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from 'src/db/typeorm.config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import jwtConfig from './jwt.config';
import appConfig from './app.config';
import { IsExist } from 'src/common/util/exisits.validator';
import { IsNotExist } from 'src/common/util/not_exists.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
  providers: [IsExist, IsNotExist],
})
export class AppConfigModule {}
