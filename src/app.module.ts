import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envConfig from '../config/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointModule } from './modules/appoint/appoint.module';
import { Appoint } from './modules/appoint/entities/appoint.entity';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entities/user.entity';
import { DatabaseModule } from '/@/processors/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: [envConfig.path],
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mysql',
    //     entities: [Appoint, User], // 数据表实体
    //     host: configService.get('DB_HOST', 'localhost'), // 默认 localhost
    //     port: configService.get<number>('DB_PORT', 3306), // 默认 3306
    //     username: configService.get('DB_USER', 'root'),
    //     password: configService.get('DB_PASSWORD', ''),
    //     database: configService.get('DB_DATABASE', ''),
    //     timezone: '+08:00', //服务器上配置的时区
    //     synchronize: false, //根据实体自动创建数据库表， 默认关闭
    //   }),
    // }),
    // AppointModule,
    // UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
