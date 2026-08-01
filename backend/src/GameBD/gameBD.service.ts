import { Injectable } from "@nestjs/common";
import { GameWaitRoom } from "./GameWaitRoom/gameWaitRoom";
import { GameActive } from "./GameActive/gameActive";

@Injectable()
export class GameBDService {
    constructor() {}
    private gameWaitRoomMap = new Map<string, GameWaitRoom>();
    private gameActiveMap = new Map<string, GameActive>();

    async writeGameWaitRoom(roomCode: string) {
        const gameWaitRoom = new GameWaitRoom();
        
        this.gameWaitRoomMap.set(roomCode, gameWaitRoom)
    }

}