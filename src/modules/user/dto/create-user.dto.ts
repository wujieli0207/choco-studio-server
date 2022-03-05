import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { rcStateEnum } from 'src/enums/dataEnum';

export class CreateUserDto {
  @ApiProperty({ description: '用户名称' })
  readonly userName: string;

  @ApiProperty({ description: '用户昵称' })
  @IsNotEmpty({ message: '用户昵称必填' })
  readonly userNickName: string;

  @ApiProperty({ description: '用户头像' })
  @IsNotEmpty({ message: '用户头像必填' })
  readonly userAvatar: string;

  @ApiProperty({ description: '微信 Open ID' })
  @IsNotEmpty({ message: '微信 Open ID必填' })
  readonly openId: string;

  @ApiProperty({ description: '手机号' })
  @IsNotEmpty({ message: '手机号必填' })
  readonly mobile: string;

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
