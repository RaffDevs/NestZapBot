import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ura } from "./ura.entity";
import { applications } from "../models/ura.model";

@Entity('ura_options')
export class UraOptions {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ nullable: false, unique: true })
  digit: string;

  @Column({ nullable: false })
  application: applications;

  @Column({ nullable: false })
  action: string;

  @ManyToOne(() => Ura, ura => ura.id)
  @JoinColumn({ name: 'ura_id' })
  ura_id: Ura
}