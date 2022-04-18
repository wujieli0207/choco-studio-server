import { IsIn } from 'class-validator';
import { prop } from '@typegoose/typegoose';
import { rcStateEnum } from '/@/constants/system.constant';

export abstract class Common {
  @IsIn(Object.values(rcStateEnum))
  @prop({
    enum: rcStateEnum,
    default: rcStateEnum.Exist,
    index: true,
  })
  rcState: rcStateEnum;

  @prop()
  createdName?: string;

  @prop({ default: Date.now, immutable: true })
  createdTime?: Date;

  @prop()
  updatedName?: string;

  @prop({ default: Date.now, immutable: true })
  updatedTime?: Date;
}
