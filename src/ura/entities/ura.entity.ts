import { ScheduleGroup } from "src/schedules/entities/schedule-group.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { uraLevel } from "../models/ura.model";

@Entity('ura')
export class Ura {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column({ nullable: false })
  name: string;

  @Column()
  greetings_message: string;

  @Column()
  out_hour_message: string;

  @Column()
  after_option_message: string;

  @Column({ nullable: true })
  unmatch_option_message: string;

  @Column()
  body_text: string;

  @Column()
  level: uraLevel;

  @Column({ nullable: true })
  greetings_media: string;

  @Column({ nullable: true })
  out_hour_media: string;

  @Column({ name: 'id_group_schedule'})
  id_group_schedule: number;

  @ManyToOne(() => ScheduleGroup, groupSchedule => groupSchedule.id)
  @JoinColumn({ name: 'id_group_schedule'})
  group_schedule: ScheduleGroup
}

