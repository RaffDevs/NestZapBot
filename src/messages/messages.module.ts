import { Module } from '@nestjs/common';
import { MessagesService } from './services/messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesRepository } from './repositories/messages.repository';
import { MessageFactory } from './services/message-factory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessagesRepository]),
  ],
  providers: [
    MessageFactory
  ],
  controllers: [],
  exports: [MessageFactory]
})

export class MessagesModule { }
