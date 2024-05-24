import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/infra/controllers/user.controller';
import { UserEntity } from 'src/infra/typeorm/entities/user.entity';
import { UserRepository } from 'src/infra/typeorm/repositories/user.repository';
import { EmailIsUniqueValidator } from 'src/application/requests/users/validator/EmailIsUnique.validator';
import { UserService } from 'src/application/useCases/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserRepository,UserService,EmailIsUniqueValidator],
})
export class UserModule {}
