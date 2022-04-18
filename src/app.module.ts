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
import { ArticleModule } from '/@/modules/article/article.module';
import { TagModule } from '/@/modules/tag/tag.module';
import { CategoryModule } from '/@/modules/category/category.module';

@Module({
  imports: [DatabaseModule, ArticleModule, TagModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
