import {  Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashPassWordPipe implements PipeTransform {
    constructor(private configService: ConfigService) {}
    
    async transform(password : string) {
        const bcryptHash = this.configService.get<string>('BCRYPT_HASH')

        return await bcrypt.hash(password, bcryptHash)    
    }
}