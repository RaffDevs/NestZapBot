import { Injectable } from "@nestjs/common";
import { Client } from "@open-wa/wa-automate";
import { MessageFactory } from "./message-factory.service";

@Injectable()
export class MessageHandlerService {

  constructor( private messageFactory: MessageFactory ) { }

  async handleMessages(session: Client): Promise<void> {
    session.onMessage(async (message) => {

      try {
        const messageData = await this.messageFactory.buildMessage(session, message);

      } catch(error) {
        console.log('Failed to process massage!', error);
      }

    });
  }
}