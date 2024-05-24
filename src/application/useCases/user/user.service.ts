import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/infra/typeorm/entities/user.entity";
import { CreateUserDTO } from "src/application/requests/users/CreateUser.dto";
import { UpdateUserDTO } from "src/application/requests/users/UpdateUser.dto";
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
        userEntity.email = createUserData.email;
        userEntity.name = createUserData.name;
        userEntity.password = createUserData.password;

        return await this.userRepository.save(userEntity);
    }

    async findById(id: uuid) : Promise<UserEntity> {
        console.log(id)
        const user = await this.userRepository.findOne({where : {id: id.toString()}});
        if (!user)
            throw new NotFoundException('User with id ${id} not found')

        return user
    }

    async update(userId: uuid, updateUser: UpdateUserDTO) {
        console.log(userId)
        const user: UserEntity = await this.findById(userId);

        user.name = updateUser.name;

        return await this.userRepository.save(user);
    }
}