import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/typeorm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {

  constructor (
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}
  
  async findByEmail(email: string) {
    return this.userRepository.exists({
      where: {email}
    })
  }
}
