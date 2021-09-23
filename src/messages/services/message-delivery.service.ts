import { ChatId, Client } from "@open-wa/wa-automate";
import { CreateSessionService } from "src/bot/services/create-session.service";
import { MessageData } from "../entities/messages.entity";
import { MessagesRepository } from "../repositories/messages.repository";
import { resolve } from 'path';
import { Injectable } from "@nestjs/common";

@Injectable()
export class MessageDelivery {
  private session: Client;

  constructor(
    private sessionWhats: CreateSessionService,
    private messageRepository: MessagesRepository
  ) {
    this.session = this.sessionWhats.session;
  }

  public async resolveDeliveryMessage(message: MessageData): Promise<void> {
    if (message.type !== 'chat') {
      await this.deliveryFile(message);
    } else {
      await this.deliveryMessage(message);
    }
  }

  private async deliveryMessage(message: MessageData): Promise<void> {
    this.session.sendText(
      message.contact as ChatId,
      message.message,
    )
    .then( async success => {
      console.log('[ ] Your message has been delivered');

      await this.messageRepository
      .updateIdMessage({
        identifier: success as string,
        message: message,
      });

    })
    .catch(error => {
      console.log('[ ] An error ocurred while delivered message', error);
    })
  }

  private async deliveryFile(message: MessageData): Promise<void> {
    if (message.type === 'image') {
      await this.session.sendImage(
        message.contact as ChatId,
        resolve(`media/uploads/${message.message}`),
        message.message,
        ''
      ).then(async success => {
        console.log('[ ] Your image has been delivered!');

        await this.messageRepository.updateIdMessage({
          identifier: success as string,
          message: message
        });
      })
      .catch(error => {
        console.log('[ ] An error ocurred while image delivery');
      });

    } else {
      await this.session.sendFile(
        message.contact as ChatId,
        resolve(`media/uploads/${message.message}`),
        message.message,
        '',
        null,
        true,
        message.type === 'ptt' ? true : false
      ).then(async success => {
        console.log('[ ] Your file has been delivered!');

        await this.messageRepository.updateIdMessage({
          identifier: success as string,
          message: message
        });
      }).catch(error => {
        console.log('[ ] An error ocurred while delivery file', error);
      });

    }
  }
}