import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "src/infra/typeorm/entities/movie.entity";
import { Repository } from "typeorm";

@Injectable()
export class MovieRepository {

  constructor (
    @InjectRepository(MovieEntity)
    private repository: Repository<MovieEntity>
  ) {}
}