import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SensorDataGateway {
  @WebSocketServer()
  server: Server;

  // Ahora acepta el evento y los datos como argumentos
  emitSensorDataUpdate(event: string, data: any) {
    this.server.emit(event, data);
  }
}

