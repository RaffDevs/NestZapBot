import { ChatId } from "@open-wa/wa-automate";
import { EntityRepository, Repository } from "typeorm";
import { MessageData } from "../entities/messages.entity";

@EntityRepository(MessageData)
export class MessagesRepository extends Repository<MessageData> {
  
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

  async saveMessage(message: MessageData): Promise<MessageData> {
    const messageData = await this.create(message);
    await this.save(messageData);

    return messageData;
  }


}