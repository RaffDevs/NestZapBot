import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MessageContext } from "../message.model";

@Entity('messages')
export class MessageData {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column({nullable: false})
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
  
  @Column()
  ticket: string;

}