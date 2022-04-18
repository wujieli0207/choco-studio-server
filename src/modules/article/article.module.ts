import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ArticleProvider } from './article.model';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService, ArticleProvider],
  exports: [ArticleService],
})
export class ArticleModule {}
