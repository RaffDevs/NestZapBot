import { Schedules } from "../entities/schedules.entity";

export interface IScheduleRepository {
  getMainSchedule(groupScheduleId: number): Promise<Schedules[]>
}