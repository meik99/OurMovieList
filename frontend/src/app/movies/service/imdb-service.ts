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
}
