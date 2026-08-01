import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";

@Controller('api')
export class UserController {
    constructor(private userService: UserService){}

    @Post('register')
    async register(@Body() body: { username: string, email: string, password: string }) {
        console.log("Обработка реєстрації...", body);

        return this.userService.register(body.username, body.email, body.password);
    }

    @Post('login')
    //@UseGuards(AuthGuard('jwt'))
    async login(@Body() body: { email: string, password: string }) {
        console.log("Обработка логіну...", body);

        return this.userService.login(body.email, body.password);
    }
}