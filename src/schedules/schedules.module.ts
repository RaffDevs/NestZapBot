import { Module } from '@nestjs/common';
import { SchedulesService } from './services/schedules-factory.service';
import { SchedulesController } from './controllers/schedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleRepository } from './repositories/schedules.repository';
import { ScheduleGroupRepository } from './repositories/schedule-group.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScheduleRepository,
      ScheduleGroupRepository
    ]),
  ],
  providers: [SchedulesService],
  controllers: [SchedulesController],
  exports: [ SchedulesService ]
})
export class SchedulesModule {}
