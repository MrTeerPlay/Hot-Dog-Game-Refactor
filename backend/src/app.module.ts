import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { PrismaModule } from './Prisma/prisma.module';
import { GameBDModule } from './GameBD/gameBD.module';
import { GameModule } from './Game/game.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }), JwtModule, UserModule, GameBDModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
