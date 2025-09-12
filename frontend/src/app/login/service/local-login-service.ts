import { Injectable } from "@angular/core";
import { LoginService } from "./login-service";
import { Observable, of } from "rxjs";
import { User } from "../User";

@Injectable({
  providedIn: "root",
})
export class LocalLoginService extends LoginService {
  user: User | null = null;

  override login(
    email: string,
    password: string,
  ): Observable<User | null> {
    this.user = new User({ email: email });
    return of(this.user);
  }

  override getUser(): User | null {
    return this.user;
  }

  override logout(): void {
    this.user = null;
  }

  override register(email: string, password: string): Observable<User | null> {
    this.user = new User({ email: email });
    return of(this.user);
  }
}
