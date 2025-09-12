import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../Movie';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {
  constructor(private http: HttpClient) { }

  async findMovieById(imdbId: string): Promise<Observable<Movie | null>> {
    return this.http.get<Movie | null>(`https://api.imdbapi.dev/titles/${imdbId}`)
      .pipe(map((response: any) => {
        if (!response || response.code) {
          return null;
        }

        return new Movie(response);
      }))
  }

  async queryMovies(imdbQuery: string): Promise<Observable<Movie[]>> {
    return this.http.get<any[]>(`https://api.imdbapi.dev/search/titles?query=${imdbQuery}`)
      .pipe(map((response: any) => {
        if (!response || response.code) {
          return [];
        }

        return response.titles.map((item: any) => new Movie(item));

      }
      ));
  }
}
