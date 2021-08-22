import { EntityRepository, Repository } from "typeorm";
import { Schedules } from "../entities/schedules.entity";
import { IScheduleRepository } from "../interfaces/schedule.interface";
import moment from 'moment';

@EntityRepository(Schedules)
export class ScheduleRepository extends Repository<Schedules>
implements IScheduleRepository {

  async getMainSchedule(scheduleGroupId: number): Promise<Schedules[]> {
    const dayWeek = moment().locale('pt-br').format('dddd');

    const schedules = await this.createQueryBuilder('sche')
    .where('sche.group_schedule = :id_group', { id_group: scheduleGroupId })
    .andWhere(':dayWeek = ANY(sche.day_week)', { dayWeek: dayWeek })
    .andWhere(`NOW()::time BETWEEN sche.time_start::time AND sche.time_end::time`)
    .getMany();

    return schedules;
  }
}