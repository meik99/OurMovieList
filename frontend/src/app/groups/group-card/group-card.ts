import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Group } from "../Group";
import { RouterLink } from "@angular/router";
import { GroupService } from "../service/group-service";
import { LoginService } from "../../login/service/login-service";

@Component({
  selector: "app-group-card",
  imports: [RouterLink],
  templateUrl: "./group-card.html",
  styleUrl: "./group-card.scss",
})
export class GroupCard {
  @Input()
  group?: Group;
  @Output()
  onLeave = new EventEmitter<void>();

  constructor(
    private groupService: GroupService,
    private loginService: LoginService
  ) { }

  leave() {
    const user = this.loginService.getUser();

    if (!user || !this.group || !this.group) {
      return;
    }

    this.group.friends = this.group.friends.filter(friend => friend.email !== user.email);

    this.groupService.update(this.group).subscribe(() => {
      this.onLeave.emit();
    });
  }
}
