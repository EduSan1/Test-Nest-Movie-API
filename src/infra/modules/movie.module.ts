import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from 'src/infra/controllers/movie.controller';
import { MovieEntity } from 'src/infra/typeorm/entities/movie.entity';
import { MovieService } from 'src/application/useCases/movie/movie.service';
import { MovieRepository } from 'src/infra/typeorm/repositories/movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  controllers: [MovieController],
  providers: [MovieRepository,MovieService],
})
export class MovieModule {}
