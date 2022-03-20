import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenresDto, Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {}

  getMovies(type = 'upcoming', count = 12) {
    return this.http.get<MovieDto>(`${environment.baseUrl}/movie/${type}?api_key=${environment.apiKey}`)
    .pipe(
      map(res => {
        return res.results.slice(0, count);
      })
    );
  }

  getMovie(id: string) {
    return this.http.get<Movie>(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`);
  }

  getMovieVideos(id: string) {
    return this.http.get<MovieVideoDto>(`${environment.baseUrl}/movie/${id}/videos?api_key=${environment.apiKey}`)
    .pipe(
      map(res => {
        return res.results;
      })
    );
  }

  getMoviesGenres() {
    return this.http.get<GenresDto>(`${environment.baseUrl}/genre/movie/list?api_key=${environment.apiKey}`)
    .pipe(
      map(res => {
        return res.genres;
      })
    );
  }

  getMoviesByGenre(genreId: string, pageNumber: number) {
    return this.http.get<MovieDto>(`${environment.baseUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${environment.apiKey}`)
    .pipe(
      map(res => {
        return res.results;
      })
    );
  }


  getMovieImages(id: string) {
    return this.http.get<MovieImages>(`${environment.baseUrl}/movie/${id}/images?api_key=${environment.apiKey}`);
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(`${environment.baseUrl}/movie/${id}/credits?api_key=${environment.apiKey}`);
  }


  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? `/search/movie` : `/movie/popular`
    return this.http.get<MovieDto>(`${environment.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${environment.apiKey}`)
    .pipe(
      map(res => {
        return res.results;
      })
    );
  }

  getTvs(type = 'latest', count = 12) {
    return this.http.get<MovieDto>(`${environment.baseUrl}/tv/${type}?api_key=${environment.apiKey}`)
    .pipe(
      map(res => {
        return res.results.slice(0, count);
      })
    );
  }
}
