import { Component } from '@angular/core';
import { UserService } from '../../../service/user-service.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { selectUser } from '../../store/user/user.selection';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrl: './header-toolbar.component.css'
})
export class HeaderToolbarComponent {
  isLoggedIn:boolean=false;
  constructor(private authService:UserService,private router:Router,private store:Store<AppState>){
    store.select(selectUser).subscribe(x=>{
      if(x){
        this.isLoggedIn=true;
      }
      else{
        this.isLoggedIn=false;
      }
    })
  }
  register() {
    this.router.navigate(["/register"]);
  }
  logIn() {
    this.router.navigate(["/"]);
  }
  logOut() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
