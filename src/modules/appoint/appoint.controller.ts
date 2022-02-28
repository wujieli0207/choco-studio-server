import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointService } from './appoint.service';
import { CreateAppointDto } from './dto/create-appoint.dto';
import { UpdateAppointDto } from './dto/update-appoint.dto';

@Controller('appoint')
export class AppointController {
  constructor(private readonly appointService: AppointService) {}

  @Post()
  create(@Body() createAppointDto: CreateAppointDto) {
    return this.appointService.create(createAppointDto);
  }

  @Get()
  findAll() {
    return this.appointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointDto: UpdateAppointDto) {
    return this.appointService.update(+id, updateAppointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointService.remove(+id);
  }
}
