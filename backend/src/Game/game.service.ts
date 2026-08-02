import { Injectable } from "@nestjs/common";
import { PrismaService } from "../Prisma/prisma.service";
import { GameBDService } from "../GameBD/gameBD.service";
import { Socket } from 'socket.io';

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService, private gameBDService: GameBDService) {}

    async createWaitRoom(client: Socket) {

        const roomCode = this.generateRoomCode(); 

        const gameWaitRoom = await this.gameBDService.writeGameWaitRoom(roomCode);
        console.log(`Код створеної кімнати: ${roomCode}`);
    }

    private generateRoomCode(length = 5): string {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            // Вибираємо випадковий символ з набору chars
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}