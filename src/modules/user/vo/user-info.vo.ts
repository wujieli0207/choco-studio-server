import { ApiProperty } from '@nestjs/swagger';

export class UserInfoVo {
  @ApiProperty({ description: '用户Id' })
  readonly userId: number;

  @ApiProperty({ description: '用户名称' })
  readonly userName: string;

  @ApiProperty({ description: '用户昵称' })
  readonly userNickName: string;

  @ApiProperty({ description: '用户头像' })
  readonly userAvatar: string;

  @ApiProperty({ description: '微信 Open ID' })
  readonly openId: string;

  @ApiProperty({ description: '手机号' })
  readonly mobile: string;
}
