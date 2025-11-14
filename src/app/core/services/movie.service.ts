import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponseList } from '@core/models/api-response.model';
import { MovieDetails } from '@core/models/movie-details.model';
import { MovieListing } from '@core/models/movie-listing.model';
import { environment } from '@env';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly _httpClient = inject(HttpClient);

  getMovies(page: number): Observable<ApiResponseList<MovieListing>> {
    return this._httpClient.get<ApiResponseList<MovieListing>>(
      environment.apiUrl + 'movie?page=' + page,
    );
  }

  async add(movieDetails: MovieDetails): Promise<MovieDetails> {
    const details = await firstValueFrom(
      this._httpClient.post<MovieDetails>(environment.apiUrl + 'movie', movieDetails),
    );

    return details;
  }
}
