import { Inject, Injectable } from "@nestjs/common";
import { Client } from "@open-wa/wa-automate";

@Injectable()
export class MessageHandlerService {
  
  async handleMessages(session: Client): Promise<void> {
    session.onMessage( async (message) => {

    })
  }
}