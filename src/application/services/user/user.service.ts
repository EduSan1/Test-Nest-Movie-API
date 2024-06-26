import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/infra/typeorm/entities/user.entity";
import { CreateUserDTO } from "src/application/requests/users/CreateUser.dto";
import { UpdateUserDTO } from "src/application/requests/users/UpdateUser.dto";
import { Repository, Like } from "typeorm";

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

    async findById(id: string) : Promise<UserEntity> {
        const user = await this.userRepository.findOne({where : {id: id}});
        if (!user)
            throw new NotFoundException(`User with id ${id} not found`)

        return user
    }

    async update(userId: string, updateUser: UpdateUserDTO) {
        const user: UserEntity = await this.findById(userId);

        user.name = updateUser.name;

        return await this.userRepository.save(user);
    }

    async findByEmail(email: string) {
        const user = await this.userRepository.findOne({where : {email: Like(email)}});

        if (user === null)
            throw new NotFoundException(`User with email ${email} not found`);
        
        return user
    }
}