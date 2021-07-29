import { Injectable } from "@nestjs/common";
import { Client } from "@open-wa/wa-automate";
import { MessageFactory } from "./message-factory.service";

@Injectable()
export class MessageHandlerService {

  constructor( private messageFactory: MessageFactory ) { }

  async handleMessages(session: Client): Promise<void> {
    session.onMessage(async (message) => {
      await this.messageFactory.buildMessage(session, message)
        .then(success => {
          console.log('Message has been processed!');
        }).catch(error => {
          console.log('Error during message process!', error);
        });
    });
  }
}