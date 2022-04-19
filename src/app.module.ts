import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '/@/processors/database/database.module';
import { ArticleModule } from '/@/modules/article/article.module';
import { TagModule } from './modules/tag/tag.module';
import { CategoryModule } from '/@/modules/category/category.module';

@Module({
  imports: [DatabaseModule, ArticleModule, TagModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
