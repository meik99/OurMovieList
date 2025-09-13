import { Injectable } from "@angular/core";
import { GroupService } from "./group-service";
import { Observable, of } from "rxjs";
import { Group } from "../Group";
import { GroupMovie } from "../GroupMovie";

@Injectable({
  providedIn: "root",
})
export class LocalGroupService extends GroupService {
  groups: Group[] = [
    new Group({
      id: "1",
      name: "New group 1",
      friends: [
        { email: "friend1@email.com" },
        { email: "friend2@email.com" },
        { email: "friend3@email.com" }
      ],
    }),
    new Group({
      id: "2",
      name: "New group 2",
      friends: [
        { email: "friend1@email.com" },
        { email: "friend2@email.com" },
        { email: "friend3@email.com" }
      ],
    }),
    new Group({
      id: "3",
      name: "New group 3",
      friends: [
        { email: "friend1@email.com" },
        { email: "friend2@email.com" },
        { email: "friend3@email.com" }
      ],
    }),
  ];

  override findAll(): Observable<Group[]> {
    return of(this.groups);
  }

  override insert(group: Group): Observable<Group> {
    this.groups.push(group);
    return of(group);
  }

  override findById(id: string): Observable<Group | null> {
    const group = this.groups.find(g => g.id === id);
    return of(group || null);
  }
  
  override update(group: Group): Observable<Group | null> {
    const index = this.groups.findIndex(g => g.id === group.id);
    if (index !== -1) {
      this.groups[index] = group;
      return of(group);
    }
    return of(null);
  }

  override upvote(groupId: string, imdbId: string): Observable<GroupMovie | null> {
    throw new Error("Method not implemented.");
  }
  
  override downvote(groupId: string, imdbId: string): Observable<GroupMovie | null> {
    throw new Error("Method not implemented.");
  }
}
