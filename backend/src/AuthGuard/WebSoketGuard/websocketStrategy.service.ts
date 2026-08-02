import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from '../../Game/game.service';
import { UseGuards } from '@nestjs/common';
import { WebSocketAuthGuard } from '../WebSocketStrategy/websocketAuthGuard.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebSocketStrategyService implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private gameService: GameService) {}

    @WebSocketServer()
    server!: Server;

    handleConnection(client: Socket) {
        console.log(`Клієнт підключився: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Клієнт відключився: ${client.id}`);
    }

    @UseGuards(WebSocketAuthGuard)
    @SubscribeMessage('waitRoom:createRoom')
    handleGameCreateWaitRoom(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
        this.gameService.createWaitRoom(client);
        console.log(`Гравець ${client.data.user.username} створює кімнату`);
    }
}