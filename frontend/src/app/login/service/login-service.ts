import { Injectable } from '@angular/core';
import { User } from '../User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class LoginService {
  abstract getUser(): User | null
  abstract login(email: string, password: string): Observable<User | null>
  abstract register(email: string, password: string): Observable<User | null>
  abstract logout(): void
}
