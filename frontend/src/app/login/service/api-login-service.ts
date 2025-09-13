import { Injectable } from '@angular/core';
import { LoginService } from './login-service';
import { concatMap, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService extends LoginService {
  private user: User | null = null;

  constructor(private http: HttpClient) {
    super();
  }

  override getUser(): User | null {
    return this.user;
  }
  override login(email: string, password: string): Observable<User | null> {
    const authToken = btoa(`${email}:${password}`);
    const headers = { 'Authorization': `Basic ${authToken}`, 'Content-Type': 'application/json' };

    return this.http.post<User | null>(`${environment.apiUrl}/users/login`, {
      email: email,
      password: password
    }, {
      headers: headers
    }).pipe(map((user: any) => {
      if (!user) {
        return null;
      }

      this.user = new User({...user.user, token: user.token, exp: user.exp});
      return user;
    }));
  }

  override register(email: string, password: string, inviteCode: string): Observable<User | null> {

    return this.http.post<User | null>(`${environment.apiUrl}/users`, {
      email: email,
      password: password,
      inviteCode: inviteCode
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(switchMap(() => {
      return (this.login(email, password))
    }));
  }

  override logout(): void {
    const headers = { 'Authorization': `Bearer ${this.user?.token}` };

    this.http.post<void>(`${environment.apiUrl}/users/logout`, null, {
      headers: headers
    }).pipe(map(() => {
      this.user = null;
    })).subscribe();
  }

}
