import { Controller, Get } from '@nestjs/common';
import { create, NotificationLanguage } from '@open-wa/wa-automate';
import { CreateSessionService } from '../services/create-session.service';

@Controller('bot')
export class BotController{
  
  constructor(
    private createSession: CreateSessionService
  ) { }

  @Get('')
  async initBot(): Promise<string> {
    return this.createSession.exec().then(success => {
      console.log('OpenWA has been initialized!');

      return JSON.stringify({
        status: "success",
        message: "OpenWA has been initialized"
      });

    }).catch(error => {
      console.log('Failed to initialized OpenWA', error);

      return JSON.stringify({
        status: "error",
        message: "Failed to initialized OpenWA"
      });

    });
  }
}
