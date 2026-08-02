import { Module } from "@nestjs/common";
import { WebSocketAuthGuard } from "./websocketAuthGuard.service";
import { JwtStrategyModule } from "../JwtStrategy/jwtStrategy.module";

@Module({
    imports: [JwtStrategyModule],
    exports: [WebSocketAuthGuard],
    controllers: [],
    providers: [WebSocketAuthGuard],
})

export class WebSocketAuthGuardModule {}