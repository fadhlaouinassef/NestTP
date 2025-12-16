import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from '../entities/messages';
import { MessagesService } from './messages.service';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService, ChatGateway],
  exports: [MessagesService],
})
export class MessagesModule {}
