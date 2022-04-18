import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { cloneDeep } from 'lodash';
import { rcStateEnum } from '/@/constants/system.constant';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserInfoVo } from './vo/user-info.vo';

export interface UserRo {
  list: UserInfoVo[];
  count: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { mobile, openId } = createUserDto;

    if (!mobile) {
      throw new HttpException('缺少用户手机号', HttpStatus.UNAUTHORIZED);
    }

    // 手机号 + openId 定义为一个用户
    const user = await this.userRepository.findOne({
      where: { mobile, openId },
    });

    if (user) {
      throw new HttpException('该用户已存在已存在', HttpStatus.UNAUTHORIZED);
    }

    return await this.userRepository.save(createUserDto);
  }

  async findAll(): Promise<UserRo> {
    const qb = getRepository(User)
      .createQueryBuilder('t1')
      .select([
        't1.userId',
        't1.userName',
        't1.userNickName',
        't1.userAvatar',
        't1.openId',
        't1.mobile',
      ])
      .where(`t1.rcState = '${rcStateEnum.Exist}'`)
      .orderBy('t1.created_time', 'DESC');

    return {
      list: await qb.getMany(),
      count: await qb.getCount(),
    };
  }

  async findOne(id: number): Promise<UserInfoVo> {
    const qb = getRepository(User)
      .createQueryBuilder('t1')
      .select([
        't1.userId',
        't1.userName',
        't1.userNickName',
        't1.userAvatar',
        't1.openId',
        't1.mobile',
      ])
      .where(`t1.userId = '${id}'`)
      .where(`t1.rcState = '${rcStateEnum.Exist}'`);

    return await qb.getOneOrFail();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existUser = await this.userRepository.findOne(id);
    if (!existUser) {
      throw new HttpException(`id为${id}的用户不存在`, HttpStatus.UNAUTHORIZED);
    }

    const updateUser = this.userRepository.merge(existUser, updateUserDto);

    return await this.userRepository.save(updateUser);
  }

  async remove(id: number): Promise<User> {
    const existUser = await this.userRepository.findOne(id);
    if (!existUser) {
      throw new HttpException(`id为${id}的用户不存在`, HttpStatus.UNAUTHORIZED);
    }
    const deleteUser = cloneDeep(existUser);
    deleteUser.rcState = rcStateEnum.Deleted;

    return await this.userRepository.save(deleteUser);
  }
}
