import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../Group';

@Injectable({
  providedIn: 'root'
})
export abstract class GroupService {
  abstract findAll(): Promise<Observable<Group[]>>
  abstract insert(group: Group): Promise<Observable<Group>>
}
