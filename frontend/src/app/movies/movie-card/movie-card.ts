import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImdbService } from '../service/imdb-service';
import { ImdbMovie } from '../ImdbMovie';
import { GroupMovie } from '../../groups/GroupMovie';
import { Group } from '../../groups/Group';
import { GroupService } from '../../groups/service/group-service';
import { tap } from 'rxjs';
import { LoginService } from '../../login/service/login-service';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard implements OnInit {
  @Input()
  groupMovie: GroupMovie | null = null;
  @Input()
  group: Group | null = null;
  @Output()
  onVote = new EventEmitter<void>();
  @Output()
  onDelete = new EventEmitter<string | null>();

  movie: ImdbMovie | null = null;

  constructor(
    private imdbService: ImdbService,
    private groupService: GroupService,
    private loginService: LoginService
  ) { }

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

  upvote() {
    console.log(this.group)
    console.log(this.groupMovie)

    if (!this.group || !this.groupMovie || !this.group.id || !this.groupMovie.imdbId) {
      return;
    }

    this.groupService.upvote(this.group.id, this.groupMovie.imdbId).subscribe(groupMovie => {
      this.groupMovie = groupMovie;
      this.onVote.emit();
    });
  }

  downvote() {
    if (!this.group || !this.groupMovie || !this.group.id || !this.groupMovie.imdbId) {
      return;
    }

    this.groupService.downvote(this.group.id, this.groupMovie.imdbId).subscribe(groupMovie => {
      this.groupMovie = groupMovie;
      this.onVote.emit();
    });
  }

  get isUpvoted() {
    const user = this.loginService.getUser();
    return user && this.groupMovie?.upvotes?.find(upvote => (upvote as any).id === user.id);
  }

  get isDownvoted() {
    const user = this.loginService.getUser();
    return user && this.groupMovie?.downvotes?.find(downvote => (downvote as any).id === user.id);
  }

  get canDelete() {
    const user = this.loginService.getUser();
    return user && this.group?.admin?.id === user.id;
  }
}