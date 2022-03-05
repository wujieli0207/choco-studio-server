import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { rcStateEnum } from 'src/enums/dataEnum';

export class CreateAppointDto {
  @ApiProperty({ description: '可预约内容标题' })
  @IsNotEmpty({ message: '可预约内容标题必填' })
  readonly appointTitle: string;

  @ApiProperty({ description: '可预约内容描述' })
  @IsNotEmpty({ message: '可预约内容标题必填' })
  readonly appointDesc: string;

  @ApiProperty({ description: '可预约内容图片' })
  @IsNotEmpty({ message: '可预约内容图片必填' })
  readonly appointImg: string;

  @ApiProperty({ description: '可预约内容金额' })
  @IsNumber()
  readonly appointAmt: number;

  @ApiProperty({ description: '每日的可预约开始时间' })
  readonly appointStartTime: Date;

  @ApiProperty({ description: '每日的可预约结束时间' })
  readonly appointEndTime: Date;

  @ApiProperty({ description: '是否有效', default: rcStateEnum.Exist })
  @IsEnum(rcStateEnum)
  readonly rcState: string;

  @ApiProperty({ description: '创建人' })
  readonly createdBy: string;

  @ApiProperty({ description: '创建时间' })
  createdTime: Date;

  @ApiProperty({ description: '更新人' })
  readonly updatedBy: string;

  @ApiProperty({ description: '更新时间' })
  readonly updatedTime: Date;
}
