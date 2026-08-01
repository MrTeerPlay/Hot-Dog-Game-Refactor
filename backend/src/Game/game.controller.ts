import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { GameService } from "./game.service";

@Controller('api')
export class GameController {
    constructor(private gameService: GameService){}

    @Post('createWaitRoom')
    async createWaitRoom(@Body() body: {}) {

        return this.gameService.createWaitRoom();
    }
}