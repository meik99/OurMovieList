import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Login } from "./login/login";
import { Register } from "./register/register";
import { LoginService } from "./login/service/login-service";
import { User } from "./login/User";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Login, Register],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App implements OnInit {
  protected title = "Our Movie List";
  showLogin = true;
  isLoggedIn = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    console.log("Fuck off Rene!");

    this.isLoggedIn = !!this.loginService.getUser();
  }

  checkUser(user: User | null) {
    this.isLoggedIn = !!user;
  }
}
