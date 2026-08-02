import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Socket } from 'socket.io';

export class WebSocketAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService) {}

    canActivate(context: ExecutionContext): boolean {
        const client = context.switchToWs().getClient();

        const token = client.handshake.auth?.token;

        if (!token) {
            return false;
        }

        try {
            const secret = this.configService.get<string>('backend/.env');

            const payload = this.jwtService.verify(token, { secret });

            client.data.user = { id:payload.id, username:payload.username }

            return true;
        } catch {
            return false;
        }
    }
}