import { EntityRepository, Repository } from "typeorm";
import { ScheduleGroup } from "../entities/schedule-group.entity";

@EntityRepository(ScheduleGroup)
export class ScheduleGroupRepository extends Repository<ScheduleGroup> {
  public async getAlgo(): Promise<ScheduleGroup[]> {
    return await this.find();
  }
}