import { Component, Input, OnInit } from '@angular/core';
import { ImdbService } from '../service/imdb-service';
import { ImdbMovie } from '../ImdbMovie';
import { GroupMovie } from '../../groups/GroupMovie';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard implements OnInit{
  @Input()
  groupMovie: GroupMovie | null = null;

  movie: ImdbMovie | null = null;

  constructor(private imdbService: ImdbService) {}

  ngOnInit() {
    if (this.groupMovie && this.groupMovie.imdbId) {
      this.imdbService.findMovieById(this.groupMovie.imdbId).subscribe(movie => {
        this.movie = movie;
      });
    }
  }

  get score() {
    return this.groupMovie ? (this.groupMovie.upvotes?.length || 0) - (this.groupMovie.downvotes?.length || 0) : 0;
  }
}
