import { Injectable } from "@nestjs/common";
import { PrismaService } from "../Prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async register(username: string, email: string, password: string) {
        const passwordHash = await bcrypt.hash(password, 10);

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
            throw new Error('Користувача не знайдено');
        }

        const passwordValid = await bcrypt.compare(password, user.passwordHash);

        if (!passwordValid)
        {
            throw new Error('Пароль не дійсний');
        }

        console.log("Увійшов в систему користувач: ", email, password);
        return { message: "Логін пройшов успішно" };
    }
}