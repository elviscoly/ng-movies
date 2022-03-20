import { Movie } from '../../models/movie';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;
  searchValue: string | null = null;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({genreId}) => {
      if(genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getPagedMovies(1);
      }
    })

  }

  getPagedMovies(page: number, searchKeyword?: string) {
    this.moviesService.searchMovies(page, searchKeyword).subscribe((response) => {
      this.movies = response;
    });
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe((response) => {
      this.movies = response;
    }
    );
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if(this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
      return;
    }

    if(this.searchValue) {
        this.getPagedMovies(pageNumber, this.searchValue);
        return
      }

      this.getPagedMovies(pageNumber);




  }

  onSearch() {

    if(this.searchValue) {
      this.getPagedMovies(1, this.searchValue);
    }
  }
}
