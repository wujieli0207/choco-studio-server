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
export class User {
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

  @Column({
    name: 'rc_state',
    type: 'varchar',
    default: rcStateEnum.Exist,
    comment: '是否有效',
  })
  rcState: string;

  @Column({
    name: 'created_by',
    type: 'varchar',
    default: 'admin',
    comment: '创建人',
  })
  createdBy: string;

  // ! TODO 自动更新创建时间、修改时间待修复
  @CreateDateColumn({
    name: 'created_time',
    type: 'timestamp',
    comment: '创建时间',
  })
  createdTime: Date;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    default: 'admin',
    comment: '更新人',
  })
  updatedBy: string;

  @UpdateDateColumn({
    name: 'updated_time',
    type: 'timestamp',
    comment: '创建时间',
  })
  updatedTime: Date;
}
