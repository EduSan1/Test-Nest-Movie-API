import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { MovieEntity } from "src/infra/typeorm/entities/movie.entity";
import { UserEntity } from "src/infra/typeorm/entities/user.entity";

@Injectable()
export class PostgresConfig implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host : this.configService.get('DB_HOST'),
            port : this.configService.get('DB_PORT'),
            username : this.configService.get('DB_USERNAME'),
            password : this.configService.get('DB_PASSWORD'),
            database: this.configService.get('DB_NAME'),
            entities: [UserEntity, MovieEntity],
            synchronize: true
        }
    }
    
}