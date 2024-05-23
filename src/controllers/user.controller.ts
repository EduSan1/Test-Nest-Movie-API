import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDTO } from 'src/requests/CreateUser.dto';
import { ListUserDTO } from 'src/responses/ListUser.dto';
import { v4 as uuid } from 'uuid';

@Controller('/users')
export class UserController {
  constructor(private repository: UserRepository) {}

  @Post()
  async create(@Body() createUserData: CreateUserDTO) {

    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.email = createUserData.email;
    userEntity.name = createUserData.name;
    userEntity.password = createUserData.password;

    const craetedUser = await this.repository.save(userEntity);
    return new ListUserDTO(craetedUser.id, craetedUser.name);
  }

  @Get()
  async list() {
    const users = await this.repository.find();
    return users.map((user) => new ListUserDTO(user.id, user.name))
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() createUserData: CreateUserDTO ) {
    return { 'id' : id, 'name' : createUserData.name}
  }
}
