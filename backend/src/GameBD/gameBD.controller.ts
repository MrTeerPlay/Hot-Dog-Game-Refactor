import { Controller, Post, Body, } from "@nestjs/common";
import { GameBDService } from "./gameBD.service";


@Controller('api')
export class GameBDController {
    constructor(private gameBDService: GameBDService) {}

    @Post('writeGameWaitRoom')
    async writeGameWaitRoom() {

    }
}