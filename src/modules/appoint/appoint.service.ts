import { Injectable } from '@nestjs/common';
import { CreateAppointDto } from './dto/create-appoint.dto';
import { UpdateAppointDto } from './dto/update-appoint.dto';

@Injectable()
export class AppointService {
  create(createAppointDto: CreateAppointDto) {
    return 'This action adds a new appoint';
  }

  findAll() {
    return `This action returns all appoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appoint`;
  }

  update(id: number, updateAppointDto: UpdateAppointDto) {
    return `This action updates a #${id} appoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} appoint`;
  }
}
