import { Injectable } from "@nestjs/common";
import { ScheduleGroup } from "../entities/schedule-group.entity";
import { ScheduleGroupRepository } from "../repositories/schedule-group.repository";

@Injectable()
export class ScheduleService {
  constructor(
    private scheduleGroupRepository: ScheduleGroupRepository
  ) {}

  async createScheduleGroup(name: string): Promise<ScheduleGroup> {
    const scheduleGroupToSave: ScheduleGroup = {
      name: name
    };
    const scheduleGroup = this.scheduleGroupRepository.create(scheduleGroupToSave);

    await this.scheduleGroupRepository.save(scheduleGroup);

    return scheduleGroup;
  }

}