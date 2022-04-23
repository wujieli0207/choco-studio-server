import {
  PaginateQuery,
  PaginateOptions,
  PaginateResult,
} from '/@/utils/paginate';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticlePaginateQueryDTO } from './article.dto';
import { Article } from './article.model';
import { ArticleService } from './article.service';

@Controller('article')
@ApiTags('文章模块')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto) {
    return this.articleService.create();
  }

  @Get()
  @ApiOperation({ summary: '查找所有文章' })
  getArticles(@Query() query: ArticlePaginateQueryDTO): Promise<Article[]> {
    const { page, perPage, sort, ...filters } = query;
    const paginateQuery: PaginateQuery<Article> = {};
    const paginateOptions: PaginateOptions = { page, perPage };

    // 排序条件
    if (sort) {
      paginateOptions.dateSort = sort;
    }

    // 文章状态查询条件
    if (filters.state) {
      paginateQuery.state = filters.state;
    }

    return this.articleService.paginater(paginateQuery, paginateOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto) {
    return this.articleService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
