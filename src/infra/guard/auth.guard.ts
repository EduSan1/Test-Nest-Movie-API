import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import {Request} from 'express';
import { UserPayload } from "src/application/services/user/auth/UserPayload";
import { JwtService } from '@nestjs/jwt';

interface RequestWithUser extends Request {
    user: UserPayload
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        private jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<RequestWithUser>();
        const token = this.extractToken(req);

        if(!token) {
            throw new ForbiddenException('O usuário precisa estar logado para acessar este recurso!')
        }

        try {
            const payload : UserPayload = await this.jwtService.verifyAsync(token);
            req.user = payload;
        } catch (errro) {
            throw new ForbiddenException('Token de acesso inválido!')
        }

        return true;
    }

    private extractToken(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}