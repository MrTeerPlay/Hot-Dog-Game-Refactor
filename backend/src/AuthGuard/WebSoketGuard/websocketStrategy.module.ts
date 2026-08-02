import { Module, Global } from "@nestjs/common";
import { WebSocketStrategyService } from "./websocketStrategy.service";
import { WebSocketAuthGuardModule } from "../WebSocketStrategy/websocketAuthGuard.module";
import { GameModule } from "../../Game/game.module";

@Module({
    imports: [WebSocketAuthGuardModule, GameModule],
    exports: [WebSocketStrategyService],
    controllers: [],
    providers: [WebSocketStrategyService],
})

export class WebSocketStrategyModule {}