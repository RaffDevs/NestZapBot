import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedule_group')
export class ScheduleGroup {
  @PrimaryGeneratedColumn('increment')
  id?: Number;

  @Column({ nullable: false })
  name: string;
  
}