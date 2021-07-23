import { Injectable } from '@nestjs/common';
import { create, NotificationLanguage } from '@open-wa/wa-automate';
import { resolve } from 'path';
import { MessageHandlerService } from './message-handler.service';


@Injectable()
export class CreateSessionService {

  constructor( private messageHandler: MessageHandlerService ) {}

  public exec(): void {
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

      sessionDataPath: resolve('../tokens/'),

    }).then(async session => {
      this.messageHandler.handleMessages(session);
    })
  }
}
