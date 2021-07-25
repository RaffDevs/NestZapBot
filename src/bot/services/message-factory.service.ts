import { Injectable } from "@nestjs/common";
import { Client, Message, decryptMedia, ChatId } from '@open-wa/wa-automate';
import { MessageContext } from "src/messages/message.model";
import {v4 as v4} from 'uuid';
import { MessagesRepository } from "src/messages/repositories/messages.repository";
import { MessageData } from "src/messages/entities/messages.entity";
import {extension} from 'mime';
import {resolve} from 'path';
import {writeFile} from 'fs';

export class MessageFactory {

  constructor(
    private messageRepository: MessagesRepository,
    private message: Message,
    private session: Client,
  ) {
    this.messageRepository = messageRepository;
    this.message = message;
    this.session = session;
  }

  async buildMessage(): Promise<MessageData> {

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
      context: MessageContext.WAITING,
      agent: null,
      departament_target: 'atendimento', // Alterar para departamento no db
      ticket: v4()
    };

    await this.buildMessageContext(lastMessage, messageData);

    if (this.message.type !== 'chat') {
      await this.buildMediaMessage(this.message, messageData);
    }

    return this.saveMessage(messageData);

  }

  private async buildMessageContext(lastMessage: MessageData, messageData: MessageData) {
    if (lastMessage) {
      messageData.name = lastMessage.name;

      switch(lastMessage.context) {
        case MessageContext.IN_PROGRESS:
          messageData.agent = lastMessage.agent;
          messageData.context = lastMessage.context;
          messageData.ticket = lastMessage.ticket;
          messageData.departament_target = lastMessage.departament_target;
          break;

        case MessageContext.WAITING:
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

        default:
          messageData.context = MessageContext.WAITING;
          break;
      }
      
    } else {
      messageData.context = MessageContext.WAITING;
    }

  }

  private async buildMediaMessage(whatsMessage: Message, messageData: MessageData) {
    const id = whatsMessage.id.split('_')[2];
    const mediaName = `${whatsMessage.from}_${id}_${extension(whatsMessage.mimetype)}`;
    const mediaPath = resolve(`../../media/downloads/${mediaName}`);
    
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

    const buffer = await decryptMedia(messageData);

    await writeFile(mediaPath, buffer, (err) => {
      if (err) {
        throw err;
      }

      console.log('File has been writed!');
    });

  }

  private async saveMessage(message: MessageData): Promise<MessageData> {
    const messageData = await this.messageRepository.saveMessage(message);

    await this.session.sendSeen(message.contact as ChatId);
    
    return messageData;
  }
}