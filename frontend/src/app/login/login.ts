import { Component, EventEmitter, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginService } from "./service/login-service";
import { User } from "./User";

@Component({
  selector: "app-login",
  imports: [FormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login {
  @Output()
  onRegister = new EventEmitter<any>();
  @Output()
  onLogin = new EventEmitter<User | null>();

  email: string = "";
  password: string = "";

  constructor(private loginService: LoginService) {}

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      (user) => this.onLogin.emit(user),
    );
  }
}
