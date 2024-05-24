import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from 'src/application/requests/users/CreateUser.dto';
import { UpdateUserDTO } from 'src/application/requests/users/UpdateUser.dto';
import { UserService } from 'src/application/useCases/user/user.service';
import { ListUserDTO } from 'src/application/responses/user/ListUser.dto';
import { HashPassWordPipe } from 'src/application/pipe/hashPassword.pipe';
import { LoginUseCase } from 'src/application/useCases/user/login.usecase';
import { LoginUserDTO } from 'src/application/requests/users/LoginRequest.dto';


@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
    private loginUseCase: LoginUseCase
  ) {}

  @Post()
  async create(
    @Body() createUserData: CreateUserDTO,
    @Body('password', HashPassWordPipe) hashedPassword : string 
  ) {
    createUserData.password = hashedPassword

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

  @Post('/auth')
  async login(@Body() request : LoginUserDTO) {
    return await this.loginUseCase.execute(request.email, request.password)
  }
}
