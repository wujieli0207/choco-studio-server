import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsIn,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BooleanNumberEnum } from '/@/constants/system.constant';
import { unknowToNumber } from '/@/transformers/value.transformer';

export class DateQueryDTO {
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  date?: string;
}

export class BooleanQueryDTO {
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @IsIn(Object.values(BooleanNumberEnum))
  @Transform(({ value }) => unknowToNumber(value))
  boolean?: BooleanNumberEnum;
}
