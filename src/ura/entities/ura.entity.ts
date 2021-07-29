import { ScheduleGroup } from "src/schedules/entities/schedule-group.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ura')
export class Ura {
  @PrimaryGeneratedColumn('increment')
  id?: Number

  @Column({ nullable: false })
  name: string;

  @Column()
  greetings_message: string;

  @Column()
  out_hour_message: string;

  @Column()
  after_option_message: string;

  @Column()
  body_text: string;

  @Column({ nullable: false })
  level: uraLevel;

  @Column()
  greetings_media: string;

  @Column()
  out_hour_media: string;

  @OneToOne(() => ScheduleGroup)
  id_hour_group: ScheduleGroup
}

