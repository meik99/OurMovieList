import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [
    RouterLink
  ],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies {
  movies: string[] = []
}
