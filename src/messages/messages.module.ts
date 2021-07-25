import { Module } from '@nestjs/common';
import { MessagesRepository } from './repositories/messages.repository';
import { MessagesService } from './services/messages.service';

@Module({
  providers: [
    MessagesService,
    MessagesRepository
  ],
  exports: [MessagesRepository]
})
export class MessagesModule {}
