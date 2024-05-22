import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDTO } from 'src/requests/CreateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private repository: UserRepository) {}

  @Post()
  async create(@Body() createUserData: CreateUserDTO) {
    return this.repository.save(createUserData);
  }

  @Get()
  async list() {
    return this.repository.find();
  }
}
