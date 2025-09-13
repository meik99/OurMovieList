import { Injectable } from '@angular/core';
import { GroupService } from './group-service';
import { map, Observable, of, tap } from 'rxjs';
import { Group } from '../Group';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../login/service/login-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiGroupService extends GroupService {
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
    super();
  }

  override findAll(): Observable<Group[]> {
    const user = this.loginService.getUser();

    if (!user) {
      return of([])
    }

    const header = {
      Authorization: `Bearer ${user.token}`
    }

    return this.http.get<Group[]>(`${environment.apiUrl}/groups/findMyGroups`, { headers: header })
      .pipe(map((data: any) => {
        return data.docs.map((item: any) => new Group(item));
      }));
  }

  override insert(group: Group): Observable<Group | null> {
    const user = this.loginService.getUser();

    if (!user) {
      return of(null);
    }

    const header = {
      Authorization: `Bearer ${user.token}`
    }

    group.admin = user.id;

    return this.http.post<Group>(`${environment.apiUrl}/groups`, group, { headers: header });
  }


  override findById(id: string): Observable<Group | null> {
    const user = this.loginService.getUser();

    if (!user) {
      return of(null);
    }

    const header = {
      Authorization: `Bearer ${user.token}`
    };

    return this.http.get<Group>(`${environment.apiUrl}/groups/${id}`, { headers: header })
      .pipe(
        tap(data => console.log('Fetched group:', data)),
        map((data: any) => data ? new Group(data) : null)
      );
  }

  override update(group: Group): Observable<Group | null> {
    const user = this.loginService.getUser();

    if (!user) {
      return of(null);
    }

    const header = {
      Authorization: `Bearer ${user.token}`
    };

    return this.http.patch<Group>(`${environment.apiUrl}/groups/${group.id}`, group, { headers: header })
      .pipe(
        map((data: any) => data ? new Group(data) : null)
      );
  }
}
