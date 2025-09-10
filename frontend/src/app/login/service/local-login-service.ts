import { Injectable } from "@angular/core";
import { LoginService } from "./login-service";
import { Observable, of } from "rxjs";
import { User } from "../User";

@Injectable({
  providedIn: "root",
})
export class LocalLoginService extends LoginService {
  user: User | null = null;

  async login(
    email: string,
    password: string,
  ): Promise<Observable<User | null>> {
    this.user = new User({ email: email });
    return of(this.user);
  }

  getUser(): User | null {
    return this.user;
  }
}
