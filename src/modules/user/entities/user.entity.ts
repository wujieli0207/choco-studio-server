import { Common } from 'src/common/entity/common.entity';
import { rcStateEnum } from 'src/enums/dataEnum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('t_user')
export class User extends Common {
  @PrimaryGeneratedColumn('increment')
  @PrimaryColumn({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'user_name', type: 'varchar', comment: '用户名称' })
  userName: string;

  @Column({
    name: 'user_nick_name',
    type: 'varchar',
    comment: '用户昵称',
  })
  userNickName: string;

  @Column({ name: 'user_avatar', type: 'varchar', comment: '用户头像' })
  userAvatar: string;

  @Column({ name: 'open_id', type: 'varchar', comment: '微信 Open ID' })
  openId: string;

  @Column({ name: 'mobile', type: 'varchar', comment: '手机号' })
  mobile: string;
}
