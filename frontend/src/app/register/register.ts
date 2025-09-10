import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  @Output()
  onLogin = new EventEmitter<any>();

}
