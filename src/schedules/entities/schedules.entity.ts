import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScheduleGroup } from "./schedule-group.entity";

@Entity('schedules')
export class Schedules {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ array: true, type: 'varchar' })
  day_week: string[];

  @Column({ nullable: false, default: '00:00' })
  time_start: string;

  @Column({nullable: false, default: '23:59'})
  time_end: string;

  @ManyToOne(() => ScheduleGroup, group => group.id)
  @JoinColumn({name: 'group_schedule'})
  group_schedule: ScheduleGroup;

}