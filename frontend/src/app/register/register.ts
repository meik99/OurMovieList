import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../login/User';
import { FormsModule } from '@angular/forms';
import { Login } from '../login/login';
import { LoginService } from '../login/service/login-service';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  @Output()
  onLogin = new EventEmitter<any>();

  @Output()
  onRegister = new EventEmitter<User | null>();

  email: string = "";
  password: string = "";
  inviteCode: string = "";

  constructor(private loginService: LoginService) {

  }

  register() {
    this.loginService.register(this.email, this.password, this.inviteCode).subscribe(
      (user) => this.onRegister.emit(user),
    );
  }
}
