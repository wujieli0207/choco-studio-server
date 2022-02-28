import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('t_appoint')
export class Appoint {
  @PrimaryGeneratedColumn('increment')
  @PrimaryColumn({ name: 'appoint_id' })
  appointID: number;

  @Column({ name: 'appoint_title', type: 'varchar', comment: '可预约内容标题' })
  appointTitle: string;

  @Column({ name: 'appoint_desc', type: 'varchar', comment: '可预约内容描述' })
  appointDesc: string;

  @Column({ name: 'appoint_amt', type: 'varchar', comment: '可预约内容金额' })
  appointAmt: string;

  @Column({
    name: 'appoint_start_time',
    type: 'datetime',
    comment: '每日的可预约开始时间',
  })
  appointStartTime: string;

  @Column({
    name: 'appoint_end_time',
    type: 'datetime',
    comment: '每日的可预约开始时间',
  })
  appointEndTime: string;

  @Column({
    name: 'rc_state',
    type: 'varchar',
    default: 'E',
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

  @Column({
    name: 'created_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  createdTime: Date;

  @Column({
    name: 'updated_by',
    type: 'varchar',
    default: 'admin',
    comment: '创建人',
  })
  updatedBy: string;

  @Column({
    name: 'updated_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '更新时间',
  })
  updatedTime: Date;
}
