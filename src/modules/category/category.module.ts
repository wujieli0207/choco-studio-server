import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { prop } from '@typegoose/typegoose';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {
  @prop({ unique: true })
  id: number;

  @IsNotEmpty({ message: 'name?' })
  @IsString()
  @prop({ required: true, validate: /\S+/ })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @prop({ required: true, unique: true, validate: /^[a-zA-Z0-9-_]+$/ })
  slug: string;

  @IsString()
  @prop({ default: '' })
  description: string;

  @prop({ ref: CategoryModule, default: null })
  pid: Types.ObjectId;

  @prop()
  created_name?: string;

  @prop({ default: Date.now, immutable: true })
  created_time?: Date;

  @prop()
  updated_name?: string;

  @prop({ default: Date.now, immutable: true })
  updated_time?: Date;
}
