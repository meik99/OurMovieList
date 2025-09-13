import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroupService } from '../groups/service/group-service';
import { Group } from '../groups/Group';
import { GroupMovie } from '../groups/GroupMovie';
import { MovieCard } from './movie-card/movie-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  imports: [
    RouterLink,
    MovieCard,
    FormsModule
  ],
  templateUrl: './movies.html',
  styleUrl: './movies.scss'
})
export class Movies {
  groupId = "";
  group: Group | null = null;
  movies: GroupMovie[] = [];

  name = "";
  friend = "";
  friends: string[] = [];
  editGroupModalOpen = false;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {
    this.route.queryParams.subscribe(params => {
      this.groupId = params['group_id'];

      this.refresh();
    });
  }

  refresh() {
    this.groupService.findById(this.groupId).subscribe(group => {
      this.group = group;
      this.movies = group?.movies || [];
      this.friends = group?.friends.map(friend => friend.email) || [];
      this.name = group?.name || "";

      this.movies.sort((a, b) => {
        const aVotes = (a.upvotes?.length || 0) - (a.downvotes?.length || 0);
        const bVotes = (b.upvotes?.length || 0) - (b.downvotes?.length || 0);

        return bVotes - aVotes;
      });
    });
  }

  delete(imdbId: string | null) {
    if (!imdbId || !this.group) {
      return;
    }

    this.group.movies = this.group.movies.filter(m => m.imdbId !== imdbId);
    this.groupService.update(this.group).subscribe(() => {
      this.refresh();
    });
  }


  addFriend() {
    this.friends.push(this.friend);
    this.friend = "";
  }

  removeFriend(friend: string) {
    this.friends = this.friends.filter((email) => email !== friend);
  }

  save() {
    if (!this.group) {
      return;
    }

    if (this.name && this.name !== this.group.name) {
      this.group.name = this.name;
    }

    this.group.friends = this.friends.map(email => { return { email: email } });
    this.groupService.update(this.group).subscribe((group) => {
      this.group = group
      this.editGroupModalOpen = false;
      this.refresh();
    });
  }
}
