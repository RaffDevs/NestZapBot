import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { BotModule } from './bot/bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MessagesModule, 
    BotModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'raffdevs',
      password: 'yma2578k',
      database: 'zap_bot',
      entities: ["dist/**/*.entity.js"],
      autoLoadEntities: true,
      synchronize: false
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
