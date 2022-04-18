import { Injectable } from '@nestjs/common';
import { Article } from './article.model';
import { MongooseModel } from '/@/interfaces/mongoose.interface';
import { InjectModel } from '/@/transformers/model.transformer';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: MongooseModel<Article>,
  ) {}

  create() {
    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number): Promise<Article[]> {
    const result = this.articleModel
      .find({
        id: { $in: id },
      })
      .exec();
    console.log('result: ', result);
    return result;
  }

  update(id: number) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
