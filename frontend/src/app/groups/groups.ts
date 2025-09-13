import { Component, OnInit } from "@angular/core";
import { GroupService } from "./service/group-service";
import { Group } from "./Group";
import { Router, RouterModule } from "@angular/router";
import { GroupCard } from "./group-card/group-card";
import { LoginService } from "../login/service/login-service";

@Component({
  selector: "app-groups",
  imports: [RouterModule, GroupCard],
  templateUrl: "./groups.html",
  styleUrl: "./groups.scss",
})
export class Groups implements OnInit {
  groups: Group[] = [];

  constructor(
    private loginService: LoginService,
    private groupService: GroupService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.refresh()
  }

  async logout() {
    this.loginService.logout();
    this.router.navigate(["/"]);
  }

  refresh() {
    this.groupService.findAll().subscribe(
      (groups: any) => {
        this.groups = groups;
      },
    );
  }
}
