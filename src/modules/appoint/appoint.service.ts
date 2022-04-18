import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { rcStateEnum } from '/@/constants/system.constant';
import { getRepository, Repository } from 'typeorm';
import { CreateAppointDto } from './dto/create-appoint.dto';
import { UpdateAppointDto } from './dto/update-appoint.dto';
import { Appoint } from './entities/appoint.entity';

export interface AppointRo {
  list: Appoint[];
  count: number;
}

@Injectable()
export class AppointService {
  constructor(
    @InjectRepository(Appoint)
    private readonly appointRepository: Repository<Appoint>,
  ) {}

  async create(createAppointDto: CreateAppointDto) {
    const { appointTitle } = createAppointDto;

    if (!appointTitle) {
      throw new HttpException('缺少可预约内容标题', HttpStatus.UNAUTHORIZED);
    }

    const appoint = await this.appointRepository.findOne({
      where: { appointTitle },
    });
    if (appoint) {
      throw new HttpException('可预约内容已存在', HttpStatus.UNAUTHORIZED);
    }

    return await this.appointRepository.save(createAppointDto);
  }

  async findAll(): Promise<AppointRo> {
    const qb = getRepository(Appoint)
      .createQueryBuilder('t1')
      .where(`t1.rc_state = '${rcStateEnum.Exist}'`)
      .orderBy('t1.created_time', 'DESC');

    return {
      list: await qb.getMany(),
      count: await qb.getCount(),
    };
  }

  async findOne(id: number): Promise<Appoint> {
    return await this.appointRepository.findOne(id);
  }

  async update(
    id: number,
    updateAppointDto: UpdateAppointDto,
  ): Promise<Appoint> {
    const existAppoint = await this.appointRepository.findOne(id);
    if (!existAppoint) {
      throw new HttpException(
        `id为${id}的可预约内容不存在`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const updateAppoint = this.appointRepository.merge(
      existAppoint,
      updateAppointDto,
    );

    return await this.appointRepository.save(updateAppoint);
  }

  async remove(id: number): Promise<Appoint> {
    const existAppoint = await this.appointRepository.findOne(id);
    if (!existAppoint) {
      throw new HttpException(
        `id为${id}的可预约内容不存在`,
        HttpStatus.UNAUTHORIZED,
      );
    }
    const deleteAppoint = cloneDeep(existAppoint);
    deleteAppoint.rcState = rcStateEnum.Deleted;

    return await this.appointRepository.save(deleteAppoint);
  }
}
