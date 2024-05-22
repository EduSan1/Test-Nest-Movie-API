import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users = [];

  async save(userData) {
    this.users.push(userData);
    return 'User Created!!!s';
  }

  async find() {
    return this.users;
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
