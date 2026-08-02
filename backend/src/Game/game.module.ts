import { Module } from '@nestjs/common';
import { GameService } from './game.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GameService],
  exports: [GameService]
})

export class GameModule {}