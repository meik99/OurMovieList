import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroupService } from '../groups/service/group-service';
import { Group } from '../groups/Group';
import { GroupMovie } from '../groups/GroupMovie';
import { MovieCard } from './movie-card/movie-card';

@Component({
  selector: 'app-movies',
  imports: [
    RouterLink,
    MovieCard
  ],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies {
  groupId = "";
  group: Group | null = null;
  movies: GroupMovie[] = [];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {
    this.route.queryParams.subscribe(params => {
      this.groupId = params['group_id'];

      this.groupService.findById(this.groupId).subscribe(group => {
        this.group = group;
        this.movies = group?.movies || [];

        this.movies.sort((a, b) => {
          const aVotes = (a.upvotes?.length || 0) - (a.downvotes?.length || 0);
          const bVotes = (b.upvotes?.length || 0) - (b.downvotes?.length || 0);
          return bVotes - aVotes;
        });
      });
    });
  }
}
