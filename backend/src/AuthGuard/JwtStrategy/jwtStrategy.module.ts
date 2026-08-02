import { Module } from "@nestjs/common";
import { JwtStrategyService } from "./jtwStrategy.service";

@Module({
    imports: [],
    exports: [JwtStrategyService],
    controllers: [],
    providers: [JwtStrategyService],
})

export class JwtStrategyModule {}