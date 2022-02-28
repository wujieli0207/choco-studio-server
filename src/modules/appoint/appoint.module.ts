import { Module } from '@nestjs/common';
import { AppointService } from './appoint.service';
import { AppointController } from './appoint.controller';

@Module({
  controllers: [AppointController],
  providers: [AppointService]
})
export class AppointModule {}
