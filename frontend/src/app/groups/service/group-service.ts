import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../Group';

@Injectable({
  providedIn: 'root'
})
export abstract class GroupService {
  abstract findAll(): Observable<Group[]>
  abstract findById(id: string): Observable<Group | null>
  abstract insert(group: Group): Observable<Group | null>
  abstract update(group: Group): Observable<Group | null>
}
