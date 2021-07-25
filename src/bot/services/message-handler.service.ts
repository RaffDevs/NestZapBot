import { Injectable, Inject } from "@nestjs/common";
import { Client } from "@open-wa/wa-automate";
import { MessagesRepository } from "src/messages/repositories/messages.repository";
import { MessageFactory } from "./message-factory.service";

@Injectable()
export class MessageHandlerService {
  constructor( 
     private messageRepository: MessagesRepository
  ) { }

  async handleMessages(session: Client): Promise<void> {
    session.onMessage(async (message) => {
      console.log('Mensagem entrante', message);

      const messageFactory = new MessageFactory(
        this.messageRepository,
        message,
        session
      );

      const messageData = await messageFactory.buildMessage();

      console.log('Mensagem final', messageData);

    });
  }
}