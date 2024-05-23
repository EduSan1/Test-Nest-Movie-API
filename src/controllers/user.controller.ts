import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDTO } from 'src/requests/CreateUser.dto';
import { ListUserDTO } from 'src/responses/ListUser.dto';
import { UserService } from 'src/services/user.service';


@Controller('/users')
export class UserController {
  constructor(
    private repository: UserRepository,
    private userService: UserService
  ) {}

  @Post()
  async create(@Body() createUserData: CreateUserDTO) {

    const craetedUser = await this.userService.save(createUserData);
    return new ListUserDTO(craetedUser.id, craetedUser.name);
  }

  @Get()
  async list() {
    const users = await this.userService.list();
    return users.map((user) => new ListUserDTO(user.id, user.name));
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() createUserData: CreateUserDTO ) {
    return { 'id' : id, 'name' : createUserData.name}
  }
}
