import { Global, Module } from '@nestjs/common';
import { GameBDController } from './gameBD.controller';
import { GameBDService } from './gameBD.service';

@Global()
@Module({
  imports: [],
  exports: [GameBDService],
  controllers: [GameBDController],
  providers: [GameBDService],
})

export class GameBDModule {}