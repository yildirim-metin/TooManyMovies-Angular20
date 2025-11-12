import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details-page',
  imports: [],
  templateUrl: './movie-details-page.html',
  styleUrl: './movie-details-page.scss',
})
export class MovieDetailsPage implements OnInit {
  private readonly _activactedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);

  movieId!: number;

  ngOnInit(): void {
    // this.movieId = +this._activactedRoute.snapshot.params['id'];

    this._activactedRoute.params.subscribe({
      next: (param) => {
        this.movieId = +param['id'];

        // TODO récupérer les infos
      },
    });
  }

  onNextMovie() {
    this._router.navigate(['/', 'movie', this.movieId + 1]);
  }
}
