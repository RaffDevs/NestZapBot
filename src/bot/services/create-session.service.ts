import { Injectable } from '@nestjs/common';
import { Client, create, NotificationLanguage } from '@open-wa/wa-automate';
import { resolve } from 'path';
import { MessageHandlerService } from './message-handler.service';


@Injectable()
export class CreateSessionService {

  constructor( private messageHandler: MessageHandlerService ) {}

  static sessionWhats: Client;

  public async exec(): Promise<void> {
    console.log(resolve('./tokens/'));
    create({
      headless: true,

      sessionId: 'bot-whats',
    
      authTimeout: 60,
    
      blockCrashLogs: true,
    
      disableSpins: true,
    
      hostNotificationLang: NotificationLanguage.PTBR,
    
      logConsole: false,

      logFile: true,
    
      qrTimeout: 0,
      
      cacheEnabled: false,

      executablePath: '/usr/bin/google-chrome',

      popup: 5001,

      sessionDataPath: './tokens',

    }).then(async session => {
      this.messageHandler.handleMessages(session);
      
      CreateSessionService.sessionWhats = session;
    });
  }
}
