import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [MessagesModule, BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
