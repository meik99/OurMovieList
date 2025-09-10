import { Injectable } from '@angular/core';
import { User } from '../User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class LoginService {
  abstract getUser(): User | null
  abstract login(email: string, password: string): Promise<Observable<User | null>>
  abstract logout(): Promise<void>
}
