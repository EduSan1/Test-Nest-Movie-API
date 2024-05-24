import { Injectable } from "@nestjs/common";

@Injectable()
export class LoginUseCase {
    execute(email: string, password : string) {
        return {
            'email' : email,
            'password' : password
        }
    }
}