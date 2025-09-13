import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ImdbMovie } from '../ImdbMovie';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {
  constructor(private http: HttpClient) { }

  findMovieById(imdbId: string): Observable<ImdbMovie | null> {
    return this.http.get<ImdbMovie | null>(`https://api.imdbapi.dev/titles/${imdbId}`)
      .pipe(map((response: any) => {
        if (!response || response.code) {
          return null;
        }

        return new ImdbMovie(response);
      }))
  }

  queryMovies(imdbQuery: string): Observable<ImdbMovie[]> {
    return this.http.get<any[]>(`https://api.imdbapi.dev/search/titles?query=${imdbQuery}`)
      .pipe(map((response: any) => {
        if (!response || response.code) {
          return [];
        }

        return response.titles.map((item: any) => new ImdbMovie(item));

      }
      ));
  }
}
