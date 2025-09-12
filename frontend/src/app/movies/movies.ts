import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  groupId = "";

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.groupId = params['group_id'];
    });
  }
}
