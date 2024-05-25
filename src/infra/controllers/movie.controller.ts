import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MovieService } from 'src/application/useCases/movie/movie.service';
import { MovieResponse } from 'src/application/responses/movie/MovieResponse.dto';
import { AuthGuard } from '../guard/auth.guard';
import { MovieEntity } from '../typeorm/entities/movie.entity';
import { MovieRequest } from 'src/application/requests/movie/MovieRequest.dto';


@Controller('/movies')
@UseGuards(AuthGuard)
export class MovieController {
  constructor(
    private movieService: MovieService
  ) {}

  @Post()
  async create(@Body() createMovieRequest: MovieRequest) {

    const movie = await this.movieService.save(createMovieRequest);
    return new MovieResponse(
      movie.id,
      movie.title,
      movie.description,
      movie.releaseDate
    );
  }

  @Get()
  async find() {
    const movies = await this.movieService.find();
    return movies.map((movie : MovieEntity) => new MovieResponse(
      movie.id,
      movie.title,
      movie.description,
      movie.releaseDate));
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const movie = await this.movieService.findById(id);
    return new MovieResponse(
      movie.id,
      movie.title,
      movie.description,
      movie.releaseDate);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() request: MovieRequest) {

    const movie = await this.movieService.update(id, request);
    return new MovieResponse(
      movie.id,
      movie.title,
      movie.description,
      movie.releaseDate);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.movieService.delete(id);
    return {'message' : 'Filme deletado com sucesso!'};
  }
}