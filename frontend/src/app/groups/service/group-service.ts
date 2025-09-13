import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../Group';
import { GroupMovie } from '../GroupMovie';

@Injectable({
  providedIn: 'root'
})
export abstract class GroupService {
  abstract findAll(): Observable<Group[]>
  abstract findById(id: string): Observable<Group | null>
  abstract insert(group: Group): Observable<Group | null>
  abstract update(group: Group): Observable<Group | null>
  abstract upvote(groupId: string, imdbId: string): Observable<GroupMovie | null>
  abstract downvote(groupId: string, imdbId: string): Observable<GroupMovie | null>  
}
