import { Component } from '@angular/core';
import { UserService } from '../../../service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
password: string='';
username: string='';
constructor(private userService:UserService,private router:Router){
    this.password='';
    this.username='';
}
login() {
  this.userService.login({username:this.username,password:this.password}).subscribe(x=>{
      localStorage.setItem("jwtToken","Bearer "+x.access_token);
      this.router.navigate(['main/campgrounds']);
  },error =>{
    alert("Doslo je do greske prilikom logovanja");
  })
}


}
