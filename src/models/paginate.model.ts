import { SortTypeEnum } from '/@/constants/article.constant';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { unknowToNumber } from '/@/transformers/value.transformer';

export class PaginateBaseOptionDTO {
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => unknowToNumber(value))
  page?: number;

  @Min(1)
  @Min(50)
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => unknowToNumber(value))
  perPage?: number;
}

export class PaginateOptionDTO extends PaginateBaseOptionDTO {
  @IsIn(Object.values(SortTypeEnum))
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => unknowToNumber(value))
  sort? = SortTypeEnum;
}
