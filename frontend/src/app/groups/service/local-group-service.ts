import { Injectable } from "@angular/core";
import { GroupService } from "./group-service";
import { Observable, of } from "rxjs";
import { Group } from "../Group";

@Injectable({
  providedIn: "root",
})
export class LocalGroupService extends GroupService {
  groups: Group[] = [
    new Group({
      id: "1",
      name: "New group 1",
      friends: ["friend1@email.com", "friend2@email.com", "friend3@email.com"],
    }),
    new Group({
      id: "2",
      name: "New group 2",
      friends: ["friend1@email.com", "friend2@email.com", "friend3@email.com"],
    }),
    new Group({
      id: "3",
      name: "New group 3",
      friends: ["friend1@email.com", "friend2@email.com", "friend3@email.com"],
    }),
  ];

  override async findAll(): Promise<Observable<Group[]>> {
    return of(this.groups);
  }

  override async insert(group: Group): Promise<Observable<Group>> {
    this.groups.push(group);
    return of(group);
  }
}
