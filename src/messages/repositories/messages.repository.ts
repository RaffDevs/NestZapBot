import { ChatId } from "@open-wa/wa-automate";
import { EntityRepository, Repository } from "typeorm";
import { MessageData } from "../entities/messages.entity";
import { IMessageRepository } from "../interfaces/message.repository.interface";
import { MessageContext } from "../message.model";

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
    await this.createQueryBuilder('message')
    .update()
    .set({ 
      context: MessageContext.WAITING, 
      departament_target:  departament
    })
    .where("contact = :departament", { departament: departament })
    .andWhere("context = :context", { context: MessageContext.URA })
    .execute()
  }

  async saveMessage(message: MessageData): Promise<MessageData> {
    const messageData = this.create(message);
    await this.save(messageData);

    return messageData;
  }


}