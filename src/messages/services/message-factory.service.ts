import { Client, Message, ChatId, decryptMedia } from '@open-wa/wa-automate';
import { MessageContext } from "src/messages/message.model";
import { v4 as v4 } from 'uuid';
import { MessagesRepository } from "src/messages/repositories/messages.repository";
import { MessageData } from "src/messages/entities/messages.entity";
import * as mimeType from 'mime-types';
import { resolve } from 'path';
import { writeFile } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageFactory {
  private message: Message;
  private session: Client;

  constructor(
    @InjectRepository(MessagesRepository)
    private messageRepository: MessagesRepository
  ) { }

  public async buildMessage(session: Client, message: Message): Promise<MessageData> {
    this.message = message;
    this.session = session;

    const lastMessage = await this.messageRepository.getLastMessage(this.message.from);

    let messageData: MessageData = {
      contact: this.message.from,
      name: this.message.from.replace('@c.us', ''),
      id_message: this.message.id,
      message: this.message.body,
      isReceived: true,
      isNew: true,
      type: this.message.type,
      media_path: null,
      context: MessageContext.NEW,
      agent: null,
      departament_target: 'atendimento', // Alterar para departamento no db
      ticket: v4()
    };

    await this.buildMessageContext(lastMessage, messageData);

    if (this.message.type !== 'chat') {
      await this.buildMediaMessage(this.message, messageData);
    }

    return messageData;

  }

  private async buildMessageContext(lastMessage: MessageData, messageData: MessageData) {
    if (lastMessage) {
      messageData.name = lastMessage.name;

      switch (lastMessage.context) {
        case MessageContext.IN_PROGRESS:
          messageData.agent = lastMessage.agent;
          messageData.context = lastMessage.context;
          messageData.ticket = lastMessage.ticket;
          messageData.departament_target = lastMessage.departament_target;
          break;

        case MessageContext.URA:
          messageData.context = MessageContext.URA_ANSWER;
          break;

        case MessageContext.RATING:
          messageData.agent = lastMessage.agent;
          messageData.ticket = lastMessage.ticket;
          messageData.departament_target = lastMessage.departament_target;
          messageData.context = lastMessage.context;
          break;

        case MessageContext.FINISHED:
          messageData.context = MessageContext.NEW;
          break;

        default:
          messageData.context = MessageContext.WAITING;
          messageData.ticket = lastMessage.ticket;
          messageData.departament_target = lastMessage.departament_target;
          break;
      }

    } else {
      messageData.context = MessageContext.NEW;
    }

  }

  private async buildMediaMessage(whatsMessage: Message, messageData: MessageData) {
    const id = whatsMessage.id.split('_')[2];
    const mediaName = `${whatsMessage.from}_${id}_${mimeType.extension(whatsMessage.mimetype)}`;
    const mediaPath = resolve(`media/downloads/${mediaName}`);

    messageData.media_path = `downloads/${mediaName}`;

    if (whatsMessage.type === 'ptt' || whatsMessage.type === 'audio') {
      messageData.message = 'Audio';

    } else if (whatsMessage.type === 'image') {
      messageData.message = whatsMessage.caption || 'Image';

    } else if (whatsMessage.type === 'video') {
      messageData.message = 'Video';

    } else {
      messageData.message = 'Other';
    }

    const buffer = await decryptMedia(whatsMessage);

    await writeFile(mediaPath, buffer, (err) => {
      if (err) {
        throw err;
      }

      console.log('File has been writed!');
    });

  };

  public async updateUraMessage(contactID: ChatId, departament: string): Promise<void> {
    await this.messageRepository.updateUraMessageToWaiting(contactID, departament);
  }

  public async saveMessage(message: MessageData): Promise<MessageData> {

    if (message.context !== MessageContext.INVALID) {
      const messageData = await this.messageRepository.saveMessage(message);

      await this.session.sendSeen(message.contact as ChatId);

      console.log('Message has been saved!');

      return messageData;
    }

  };
}