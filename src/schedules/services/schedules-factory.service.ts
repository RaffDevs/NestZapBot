import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedules } from '../entities/schedules.entity';
import { ScheduleRepository } from '../repositories/schedules.repository';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(ScheduleRepository) 
    private scheduleRepository: ScheduleRepository,
  ) {}

  public async getMainSchedules(scheduleGroupId: number): Promise<Schedules[]> {
    return  await this.scheduleRepository.getMainSchedule(scheduleGroupId);
  }
}
