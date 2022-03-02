import { Module } from '@nestjs/common';
import { AppointService } from './appoint.service';
import { AppointController } from './appoint.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appoint } from './entities/appoint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appoint])],
  controllers: [AppointController],
  providers: [AppointService],
})
export class AppointModule {}
