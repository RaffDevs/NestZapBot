import { Injectable } from '@nestjs/common';
import { Client, create, NotificationLanguage } from '@open-wa/wa-automate';
import { MessageHandlerService } from './message-handler.service';


@Injectable()
export class CreateSessionService {
  public sessionWhats: Client;

  constructor( private messageHandler: MessageHandlerService ) {}

  public async exec(): Promise<void> {
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

      this.sessionWhats = session;
    });
  }
}
