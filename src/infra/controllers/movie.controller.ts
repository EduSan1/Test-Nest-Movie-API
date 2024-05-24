import { Body, Controller, Post } from '@nestjs/common';
import { CreateMovieDTO } from 'src/application/requests/movie/CreateMovie.dto';
import { MovieService } from 'src/application/useCases/movie/movie.service';
import { MovieResponse } from 'src/application/responses/movie/MovieResponse.dto';


@Controller('/movies')
export class MovieController {
  constructor(
    private movieService: MovieService
  ) {}

  @Post()
  async create(@Body() createMovieRequest: CreateMovieDTO) {

    const craetedMovie = await this.movieService.save(createMovieRequest);
    return new MovieResponse(craetedMovie.id, craetedMovie.title);
  }
}