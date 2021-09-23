import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MessageContext } from "../message.model";
import { v4 as v4 } from 'uuid';


@Entity('messages')
export class MessageData {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  contact: string;

  @Column()
  name: string;

  @Column({nullable: true})
  id_message?: string;

  @Column()
  message: string;

  @Column()
  isReceived: boolean;

  @Column()
  isNew: boolean;

  @Column()
  type: string;

  @Column({nullable: true})
  media_path?: string;

  @Column({type: 'time with time zone', default: 'now()'})
  timestamp?: Date

  @Column()
  context: MessageContext

  @Column({nullable: true})
  agent: string;

  @Column()
  departament_target: string;
  
  @Column({ default: v4() })
  ticket: string;

}