import { Module } from '@nestjs/common';
import { UserModule } from './infra/modules/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfig } from './infra/typeorm/config/postgres.config';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './infra/modules/movie.module';

@Module({
  imports: [
    UserModule,
    MovieModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfig,
      inject: [PostgresConfig]
  })],
})
export class AppModule {}
