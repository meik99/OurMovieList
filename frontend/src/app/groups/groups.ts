import { Component, OnInit } from "@angular/core";
import { GroupService } from "./service/group-service";
import { Group } from "./Group";
import { RouterModule } from "@angular/router";
import { GroupCard } from "./group-card/group-card";

@Component({
  selector: "app-groups",
  imports: [RouterModule, GroupCard],
  templateUrl: "./groups.html",
  styleUrl: "./groups.scss",
})
export class Groups implements OnInit {
  groups: Group[] = [];

  constructor(private groupService: GroupService) {}

  async ngOnInit(): Promise<void> {
    (await this.groupService.findAll()).subscribe(
      (groups) => (this.groups = groups),
    );
  }
}
