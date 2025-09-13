import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { GroupService } from "../service/group-service";
import { Group } from "../Group";

@Component({
  selector: "app-create-group",
  imports: [FormsModule, RouterModule],
  templateUrl: "./create-group.html",
  styleUrl: "./create-group.scss",
})
export class CreateGroup {
  name: string = "";
  friend: string = "";
  friends: string[] = [];

  constructor(
    private groupService: GroupService,
    private router: Router,
  ) {}

  addFriend() {
    this.friends.push(this.friend);
    this.friend = "";
  }

  removeFriend(friend: string) {
    this.friends = this.friends.filter((email) => email !== friend);
  }

  save() {
    if (this.name && this.name.length > 0) {
      (
        this.groupService.insert(
          new Group({
            name: this.name,
            friends: this.friends,
          }),
        )
      ).subscribe(() => this.router.navigate(["groups"]));
    }
  }
}
