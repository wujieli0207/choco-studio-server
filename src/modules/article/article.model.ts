import { modelOptions, plugin, prop, Ref } from '@typegoose/typegoose';
import { IsDefined, IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Tag } from '../tag/tag.model';
import { PublishStateEnum } from '/@/constants/article.constant';
import { Common } from '/@/models/common.module';
import { Category } from '/@/modules/category/category.model';
import { getProviderByTypegooseClass } from '/@/transformers/model.transformer';
import { mongoosePaginate } from '/@/utils/paginate';

@plugin(mongoosePaginate)
@modelOptions({
  schemaOptions: {
    toObject: { getters: true },
  },
})
export class Article extends Common {
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

  @prop({ ref: () => Tag, index: true })
  tag: Ref<Tag>[];

  @prop({ ref: () => Category, required: true, index: true })
  category: Ref<Category>[];
}

export const ArticleProvider = getProviderByTypegooseClass(Article);
