import { Body, Controller, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDTO } from 'src/application/requests/users/CreateUser.dto';
import { UpdateUserDTO } from 'src/application/requests/users/UpdateUser.dto';
import { UserService } from 'src/application/useCases/user/user.service';
import { ListUserDTO } from 'src/application/responses/user/ListUser.dto';
import { HashPassWordPipe } from '../pipe/hashPassword.pipe';
import { LoginUseCase } from 'src/application/useCases/user/auth/login.usecase';
import { LoginUserDTO } from 'src/application/requests/users/LoginRequest.dto';
import { AuthGuard } from '../guard/auth.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';


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
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
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
