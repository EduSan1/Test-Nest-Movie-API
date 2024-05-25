import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/infra/controllers/user.controller';
import { UserEntity } from 'src/infra/typeorm/entities/user.entity';
import { UserRepository } from 'src/infra/typeorm/repositories/user.repository';
import { EmailIsUniqueValidator } from 'src/application/requests/users/validator/EmailIsUnique.validator';
import { UserService } from 'src/application/useCases/user/user.service';
import { LoginUseCase } from 'src/application/useCases/user/auth/login.usecase';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CacheModule.registerAsync({
      useFactory: async () => ({
          store: await redisStore({ ttl: 10000})
      }),
      isGlobal: true 
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '72h' }
        }
      },
      inject: [ConfigService],
      global: true
    }),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    EmailIsUniqueValidator,
    LoginUseCase
  ],
})
export class UserModule {}
