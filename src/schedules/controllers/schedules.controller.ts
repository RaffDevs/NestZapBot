import { Controller, Post } from '@nestjs/common';
import { ScheduleGroup } from '../entities/schedule-group.entity';

@Controller('schedules')
export class SchedulesController {
  @Post('')
  async insertGroupSchedule(): Promise<ScheduleGroup> {
    return
  }
}
