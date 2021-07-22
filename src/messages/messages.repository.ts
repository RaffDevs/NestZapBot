import { NotFoundException } from "@nestjs/common";
import { ChatId } from "@open-wa/wa-automate";
import { Repository } from "typeorm";
import { Message } from "./messages.entity";

export class MessagesRepository extends Repository<Message> {
  
  async getLastMessage(contactID: ChatId): Promise<Message> {
    const message = await this.findOne({
      where: {
        contact: contactID
      },

      order: {
        id: 'DESC'
      }
    });

    if (!message) {
      throw new NotFoundException('Contact not found!');
    }

    return message;
  }


}