import { rcStateEnum } from 'src/enums/dataEnum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('t_appoint')
export class Appoint {
  @PrimaryGeneratedColumn('increment')
  @PrimaryColumn({ name: 'appoint_id', type: 'int' })
  appointId: number;

  @Column({ name: 'appoint_title', type: 'varchar', comment: '可预约内容标题' })
  appointTitle: string;

  @Column({ name: 'appoint_img', type: 'varchar', comment: '可预约内容图片' })
  appointImg: string;

  @Column({ name: 'appoint_desc', type: 'varchar', comment: '可预约内容描述' })
  appointDesc: string;

  @Column({ name: 'appoint_amt', type: 'decimal', comment: '可预约内容金额' })
  appointAmt: number;

  @Column({
    name: 'appoint_start_time',
    type: 'datetime',
    comment: '每日的可预约开始时间',
  })
  appointStartTime: Date;

  @Column({
    name: 'appoint_end_time',
    type: 'datetime',
    comment: '每日的可预约结束时间',
  })
  appointEndTime: Date;

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
