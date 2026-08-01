import { Module, Global } from "@nestjs/common";
import { JwtStrategyService } from "./jtwStrategy.service";

@Global()
@Module({
    imports: [],
    exports: [JwtStrategyService],
    controllers: [],
    providers: [JwtStrategyService],
})

export class JwtStrategyModule {}