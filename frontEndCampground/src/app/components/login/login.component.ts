import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
login() {
  
}
password: string='';
username: string='';
constructor(){
  this.password='';
  this.username='';
}

}
