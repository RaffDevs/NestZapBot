import { Injectable } from "@nestjs/common";
import { Client } from '@open-wa/wa-automate';

@Injectable()
export class MessageFactory {

  async buildMessage(session: Client): Promise<void> {

  }
}