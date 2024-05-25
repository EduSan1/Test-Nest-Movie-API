import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from "./UserPayload";

@Injectable()
export class LoginUseCase {
    constructor (
        private userService: UserService,
        private jwtService: JwtService
    ) {}
    async execute(email: string, password : string) {
        const user = await this.userService.findByEmail(email);

        const userIsAuthenticated = await bcrypt.compare(
            password,
            user.password
          );

        if (!userIsAuthenticated)
            throw new UnauthorizedException('O email ou a senha inserida estam incorretos!')

        const payload: UserPayload = {
            id : user.id,
            name : user.name,
            email : user.email
        }

        return {
            accessToken: await this.jwtService.signAsync(payload),
          };
    }
}