import { JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MovieListing } from '@core/models/movie-listing.model';
import { MovieService } from '@core/services/movie.service';
import { Subscription } from 'rxjs';
import { MovieFormPage } from '../movie-form-page/movie-form-page';

@Component({
  selector: 'app-movie-listing-page',
  imports: [JsonPipe, MovieFormPage],
  templateUrl: './movie-listing-page.html',
  styleUrl: './movie-listing-page.scss',
})
export class MovieListingPage implements OnInit, OnDestroy {
  private readonly _movieService = inject(MovieService);

  total: number = 0;
  movies: MovieListing[] | null = null;
  moviesError: string | null = null;
  currentIndex: number = 1;

  getMoviesSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.getMovies(this.currentIndex);
  }

  ngOnDestroy(): void {
    this.getMoviesSubscription?.unsubscribe();
  }

  onNext() {
    this.getMovies(++this.currentIndex);
  }

  onPrevious() {
    this.getMovies(--this.currentIndex);
  }

  getMovies(page: number) {
    this._movieService.getMovies(page).subscribe({
      next: (data) => {
        // traitement
        this.total = data.count;
        this.movies = data.data;
      },
      error: (err) => {
        console.error(err);
        this.moviesError = err.message;
      },
    });
  }
}
