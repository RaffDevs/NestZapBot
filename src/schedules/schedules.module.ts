import { Module } from '@nestjs/common';
import { SchedulesService } from './services/schedules.service';
import { SchedulesController } from './controllers/schedules.controller';

@Module({
  providers: [SchedulesService],
  controllers: [SchedulesController]
})
export class SchedulesModule {}
