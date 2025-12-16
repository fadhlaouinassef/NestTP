import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  private logger = new Logger('ChatGateway');

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connecté: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client déconnecté: ${client.id}`);
  }

  @SubscribeMessage('send_message')
  async handleMessage(@MessageBody() data: any) {
    this.logger.log(`Message reçu: ${data.content}`);
    const message = await this.messagesService.create(data.content, 'sent');
    this.logger.log(`Message sauvegardé, émission à tous les clients:`, message);
    this.server.emit('receive_message', message);
    return message;
  }
}
