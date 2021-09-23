import { ChatId } from "@open-wa/wa-automate";
import { EntityRepository, Repository } from "typeorm";
import { MessageData } from "../entities/messages.entity";
import { IMessageRepository } from "../interfaces/message.repository.interface";
import { MessageContext } from "../message.model";

interface MessageUpdateOptions {
  identifier: string;
  message: MessageData;
}

@EntityRepository(MessageData)
export class MessagesRepository extends Repository<MessageData>
implements IMessageRepository {
  
  async getLastMessage(contactID: ChatId): Promise<MessageData | undefined> {
    const message = await this.findOne({
      where: {
        contact: contactID
      },
      order: {
        id: 'DESC'
      }
    });

    if (!message) {
      return;
    }

    return message;
  }

  async updateUraMessageToWaiting(contactID: ChatId, departament: string): Promise<void> {    
    const update = await this.createQueryBuilder('message')
    .update()
    .set({ 
      context: MessageContext.WAITING, 
      departament_target:  departament
    })
    .where("contact = :contactID", { contactID: contactID })
    .andWhere("context = :context", { context: MessageContext.URA })
    .execute();

    console.log('[ ] Message Updated', update);
  }

  async updateIdMessage({ ...data }: MessageUpdateOptions): Promise<void> {
    this.createQueryBuilder()
      .update()
      .set({ id_message: `${data.identifier}` })
      .where("id = :id", {id: data.message.id})
      .execute()
      .then(success => {
        console.log('[ ] Message received Identifier!');
      })
      .catch(error => {
        console.log('[ ] An error occured while message updating', error);
      });
  }

  async saveMessage(message: MessageData): Promise<MessageData> {
    const messageData = this.create(message);
    await this.save(messageData);

    return messageData;
  }


}