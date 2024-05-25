import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "src/infra/typeorm/entities/movie.entity";
import { MovieRequest } from "src/application/requests/movie/MovieRequest.dto";
import { Repository } from "typeorm";

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private readonly movieRepository: Repository<MovieEntity>
    ) {}

    async save(createMovieRequest: MovieRequest) {
        const movie = new MovieEntity();
        movie.title = createMovieRequest.title;
        movie.description = createMovieRequest.description;
        movie.releaseDate = createMovieRequest.releaseDate;

        return await this.movieRepository.save(movie);
    }

    async find() {
        return await this.movieRepository.find();
    }

    async findById(id: string) {
        const movie = await this.movieRepository.findOne({where : {id: id.toString()}});
        if (!movie)
            throw new NotFoundException(`Movie with id ${id} not found`)

        return movie
    }

    async update(id: string, movieRequest: MovieRequest) {
        const movie = await this.findById(id);

        movie.title = movieRequest.title;
        movie.description = movieRequest.description;
        movie.releaseDate = movieRequest.releaseDate;

        return await this.movieRepository.save(movie);
    }

    async delete(id: string) {
        await this.movieRepository.delete(id);
    }

}