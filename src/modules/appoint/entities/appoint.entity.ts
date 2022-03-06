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

@Entity('t_appoint')
export class Appoint extends Common {
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
}
