import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { MessageContext } from "./message.model";

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: Number

  @Column({nullable: false})
  contact: string;

  @Column()
  name: string;

  @Column()
  whatsapp_id: string;

  @Column()
  message: string;

  @Column()
  isReceived: boolean;

  @Column()
  isNew: boolean;

  @Column()
  type: string;

  @Column()
  media_path: string;

  @Column({type: 'time with time zone', default: 'now()'})
  timestamp: Date

  @Column()
  context: MessageContext

  @Column()
  agent: string;

  @Column()
  destiny: string;
  
  @Column()
  ticket: string;

}