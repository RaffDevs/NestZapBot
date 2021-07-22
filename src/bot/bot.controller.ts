import { Controller, Get } from '@nestjs/common';
import { create } from '@open-wa/wa-automate';

@Controller('bot')
export class BotController{
  
  
  constructor() {
    create().then(client => this.start(client));
  }
  
  private start(client) {
    client.onMessage(async message => {
      if (message.body === 'Hi') {
        await client.sendText(message.from, '👋 Hello!');
      }
    });
  }
}
