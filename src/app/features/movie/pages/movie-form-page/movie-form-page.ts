import { Component, inject } from '@angular/core';
import { FormBuilder, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { MovieDetails } from '@core/models/movie-details.model';
import { MovieService } from '@core/services/movie.service';

@Component({
  selector: 'app-movie-form-page',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './movie-form-page.html',
  styleUrl: './movie-form-page.scss',
})
export class MovieFormPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _movieService = inject(MovieService);

  genresForm = this._fb.array([
    this._fb.group({
      genre: [''],
    }),
  ]);

  realisatorForm = this._fb.group({
    name: [''],
    birthDate: [''],
  });

  formGroup = this._fb.group({
    title: [''],
    releaseDate: [''],
    genres: this.genresForm,
    realisator: this.realisatorForm,
  });

  onSubmit() {
    if (this.formGroup.invalid) return;

    const movieDetails: MovieDetails = {
      id: 0,
      title: this.formGroup.value.title!,
      releaseDate: this.formGroup.value.releaseDate!,
      genres: this.formGroup.value.genres?.map((g) => g.genre as string) ?? [],
      realisator: {
        id: 0,
        name: this.formGroup.value.realisator?.name!,
        birthDate: this.formGroup.value.realisator?.birthDate!,
      },
    };

    this._movieService.add(movieDetails);
  }

  addGenres() {
    this.genresForm.push(
      this._fb.group({
        genre: [''],
      }),
    );
  }

  removeGenres(index: number) {
    this.genresForm.removeAt(index);
  }
}
