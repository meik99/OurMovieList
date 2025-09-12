import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { ImdbService } from '../service/imdb-service';
import { Movie } from '../Movie';

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './create-movie.html',
  styleUrl: './create-movie.scss'
})
export class CreateMovie {
  private _imdbId: string = "";
  private _imdbIdChanged: Subject<string> = new Subject<string>();
  movie: Movie | null = null;

  constructor(
    private imdbService: ImdbService
  ) {
    this._imdbIdChanged
      .pipe(debounceTime(500))
      .subscribe(async (imdbId: string) => {
        (await this.imdbService.findMovieById(imdbId)).subscribe((movie) => {
          this.movie = movie;
          console.log(movie);
        })
      });
  }

  get imdbId(): string {
    return this._imdbId;
  }

  set imdbId(value: string) {
    this._imdbId = value;
    this._imdbIdChanged.next(value);
  }
}
