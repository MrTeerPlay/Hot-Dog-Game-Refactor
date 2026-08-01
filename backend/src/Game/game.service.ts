import { Injectable } from "@nestjs/common";
import { PrismaService } from "../Prisma/prisma.service";
import { GameBDService } from "../GameBD/gameBD.service";

@Injectable()
export class GameService {
    constructor(private prisma: PrismaService, private gameBDService: GameBDService) {}

    async createWaitRoom() {

        const roomCode = this.generateRoomCode(); 

        const gameWaitRoom = await this.gameBDService.writeGameWaitRoom(roomCode);
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