import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "src/infra/typeorm/entities/movie.entity";
import { CreateMovieDTO } from "src/application/requests/movie/CreateMovie.dto";
import { Repository } from "typeorm";

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private readonly movieRepository: Repository<MovieEntity>
    ) {}

    async save(createMovieRequest: CreateMovieDTO) {
        const movie = new MovieEntity();
        movie.title = createMovieRequest.title;
        movie.ageGroup = createMovieRequest.ageGroup;
        movie.releaseDate = createMovieRequest.releaseDate;

        return await this.movieRepository.save(movie);
        
    }
}