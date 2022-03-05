import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppointService } from './appoint.service';
import { CreateAppointDto } from './dto/create-appoint.dto';
import { UpdateAppointDto } from './dto/update-appoint.dto';

@Controller('appoint')
@ApiTags('预约内容 Controller')
export class AppointController {
  constructor(private readonly appointService: AppointService) {}

  @Post('/create')
  @ApiOperation({ summary: '创建可预约内容' })
  create(@Body() createAppointDto: CreateAppointDto) {
    return this.appointService.create(createAppointDto);
  }

  @Get('/findAll')
  @ApiOperation({ summary: '查找所有可预约内容' })
  findAll() {
    return this.appointService.findAll();
  }

  @Get('/findOne/:id')
  @ApiOperation({ summary: '查找一个可预约内容' })
  findOne(@Param('id') id: string) {
    return this.appointService.findOne(+id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: '更新可预约内容' })
  update(@Param('id') id: string, @Body() updateAppointDto: UpdateAppointDto) {
    return this.appointService.update(+id, updateAppointDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: '删除可预约内容' })
  remove(@Param('id') id: string) {
    return this.appointService.remove(+id);
  }
}
