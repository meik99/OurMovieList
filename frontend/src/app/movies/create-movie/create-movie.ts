import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, debounceTime, of, Subject } from 'rxjs';
import { ImdbService } from '../service/imdb-service';
import { ImdbMovie } from '../ImdbMovie';

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
  private _imdbQuery: string = "";
  private _imdbIdChanged: Subject<string> = new Subject<string>();
  private _imdbQueryChanged: Subject<string> = new Subject<string>();
  movie: ImdbMovie | null = null;
  movies: ImdbMovie[] = [];
  loading = false;
  loadedOnce = false;
  groupId = "";

  constructor(
    private imdbService: ImdbService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.groupId = params['group_id'];
    });
    this._imdbIdChanged
      .pipe(
        debounceTime(500)
      )
      .subscribe(async (imdbId: string) => {
        this.loading = true;
        (await this.imdbService.findMovieById(imdbId))
          .pipe(catchError(() => of(null)))
          .subscribe((movie) => {
          this.movie = movie;
          this.loading = false;
          this.loadedOnce = true;
        })
      });
      this._imdbQueryChanged
      .pipe(
        debounceTime(500)
      )
      .subscribe(async (imdbQuery: string) => {
        this.loading = true;
        (await this.imdbService.queryMovies(imdbQuery))
          .pipe(catchError(() => of([])))
          .subscribe((movies) => {
          this.movies = movies;
          this.loading = false;
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

  get imdbQuery(): string {
    return this._imdbQuery;
  }

  set imdbQuery(value: string) {
    this._imdbQuery = value;
    this._imdbQueryChanged.next(value);
  }

  save() {
    if (this.movie) {
      console.log("Saving movie", this.movie);
    }
  }
}
