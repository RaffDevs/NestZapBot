import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedule_group')
export class ScheduleGroup {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ nullable: false, unique: true })
  name: string; 
}