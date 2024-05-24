import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from 'src/application/requests/users/CreateUser.dto';
import { UpdateUserDTO } from 'src/application/requests/users/UpdateUser.dto';
import { UserService } from 'src/application/useCases/user/user.service';
import { ListUserDTO } from 'src/application/responses/user/ListUser.dto';


@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Post()
  async create(@Body() createUserData: CreateUserDTO) {

    const craetedUser = await this.userService.save(createUserData);
    return new ListUserDTO(craetedUser.id, craetedUser.name, createUserData.email);
  }

  @Get()
  async list() {
    const users = await this.userService.list();
    return users.map((user) => new ListUserDTO(user.id, user.name, user.email));
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() createUserData: UpdateUserDTO) {
    const craetedUser = await this.userService.update(id, createUserData);
    return new ListUserDTO(craetedUser.id, craetedUser.name, craetedUser.email);
  }
}
