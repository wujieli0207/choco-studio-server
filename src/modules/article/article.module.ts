import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { prop, Ref } from '@typegoose/typegoose';
import { IsDefined, IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PublishStateEnum } from '/@/constants/article.constant';
import { TagModule } from '/@/modules/tag/tag.module';
import { CategoryModule } from '/@/modules/category/category.module';
import { CommonModule } from '/@/modules/common/common.module';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule extends CommonModule {
  @prop({ unique: true })
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'title?' })
  @prop({ required: true, text: 'true', validate: /\S+/ })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'content?' })
  @prop({ required: true, text: 'true', validate: /\S+/ })
  content: string;

  @IsInt()
  @IsDefined()
  @IsIn(Object.values(PublishStateEnum))
  @prop({
    enum: PublishStateEnum,
    default: PublishStateEnum.PUBLISH,
    index: true,
  })
  state: PublishStateEnum;

  @prop({ ref: () => TagModule, index: true })
  tag: Ref<TagModule>[];

  @prop({ ref: () => CategoryModule, required: true, index: true })
  category: Ref<CategoryModule>[];
}
