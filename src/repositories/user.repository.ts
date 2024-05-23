import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserRepository {
  private users : UserEntity[] = [];

  async save(userData : UserEntity) {
    this.users.push(userData);
    return userData;
  }

  async find() {
    return this.users;
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
