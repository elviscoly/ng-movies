import { IMAGES_SIZES } from './../../constants/images-sizes';
import { Movie, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from './../../services/movies.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  readonly imagesSizes = IMAGES_SIZES;
  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService) { }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({id}) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    })
  }

  getMovie(id: string) {
    this.movieService.getMovie(id).subscribe((response) => {
     this.movie = response;
    });
  }

  getMovieVideos(id: string) {
    this.movieService.getMovieVideos(id).subscribe((response) => {
      this.movieVideos = response;
    }
    );
  }

  getMovieImages(id: string) {
    this.movieService.getMovieImages(id).subscribe((response) => {
      this.movieImages = response;
    }
    );
  }


  getMovieCredits(id: string) {
    this.movieService.getMovieCredits(id).subscribe((response) => {
      this.movieCredits = response;
      console.log(this.movieCredits);
    }
    );
  }

  ngOnDestroy(): void {
  }

}
