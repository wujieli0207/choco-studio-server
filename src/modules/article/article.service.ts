import { PaginateOptions } from './../../utils/paginate';
import { Injectable } from '@nestjs/common';
import { Article } from './article.model';
import { MongooseModel } from '/@/interfaces/mongoose.interface';
import { InjectModel } from '/@/transformers/model.transformer';
import { PaginateQuery, PaginateResult } from '/@/utils/paginate';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: MongooseModel<Article>,
  ) {}

  /**
   * ! TODO 翻页异常暂未实现
   * @desc 查询文章列表分页方法
   */
  paginater(
    query: PaginateQuery<Article>,
    options: PaginateOptions,
  ): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  create() {
    return 'This action adds a new article';
  }

  findAll(): Promise<Article[]> {
    return this.articleModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns ${id} article`;
  }

  update(id: number) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
