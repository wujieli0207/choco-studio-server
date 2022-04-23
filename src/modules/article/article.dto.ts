import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { PublishStateEnum } from '/@/constants/article.constant';
import { unknowToNumber } from '/@/transformers/value.transformer';
import { IntersectionType } from '@nestjs/mapped-types';
import { PaginateOptionDTO } from '/@/models/paginate.model';
import { DateQueryDTO } from '/@/models/query.model';

export class ArticlePaginateQueryDTO extends IntersectionType(
  PaginateOptionDTO,
  DateQueryDTO,
) {
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @IsIn(Object.values(PublishStateEnum))
  @Transform(({ value }) => unknowToNumber(value))
  state?: PublishStateEnum;
}
