import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";
import { CreateUserDTO } from "src/requests/CreateUser.dto";
import { Repository } from "typeorm";
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async list() {
        const users = await this.userRepository.find();
        return users;
    }

    async save(createUserData: CreateUserDTO) {
        const userEntity = new UserEntity();
        // userEntity.id = uuid();
        userEntity.email = createUserData.email;
        userEntity.name = createUserData.name;
        userEntity.password = createUserData.password;

        return await this.userRepository.save(userEntity);
    }
}