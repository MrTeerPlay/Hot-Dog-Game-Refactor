import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    async register(username: string, email: string, password: string) {
        console.log("Зареєстрований користувач: ", username, email, password);

        return { message: "Реєстрація пройшла успішно", username, email }
    }

    async login(email: string, password: string) {
        console.log("Увійшов в систему користувач: ", email, password);

        return { message: "Логін пройшов успішно" }
    }
}