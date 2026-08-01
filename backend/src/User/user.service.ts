import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../Prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private configService: ConfigService, private jwtService: JwtService) {}

    async register(username: string, email: string, password: string) {
        const passwordHash = await this.setPasswordHash(password);

        const user = await this.prisma.user.create({
            data: { username, email, password, passwordHash }
        })

        console.log("Зареєстрований користувач: ", username, email, password);
        return { message: "Реєстрація пройшла успішно", username, email };
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) 
        {
            throw new NotFoundException('Користувача не знайдено');
        }

        const passwordValid = await bcrypt.compare(password, user.passwordHash);

        if (!passwordValid)
        {
            throw new UnauthorizedException('Пароль не дійсний');
        }

        const token = this.setJwtToken(user.id, user.username);

        console.log("Увійшов в систему користувач: ", email, password);
        return { message: "Логін пройшов успішно" };
    }

    private async setPasswordHash(password: string): Promise<string> {
        const salt = this.configService.get<string>('SALT');

        if (salt == undefined)
        {
            throw new Error('У файлі .env не заповнена змінна SALT на число або рядок');
        }

        console.log("password hashed...");

        return await bcrypt.hash(password, salt);
    }

    private setJwtToken(id: string, username: string) {
        const secret = this.configService.get<string>('JWTTOKENSECRETKEY');

        const payload = { id, username }
        
        const token = this.jwtService.sign(payload, { secret, expiresIn: '3h' });

        return token;
    }
}