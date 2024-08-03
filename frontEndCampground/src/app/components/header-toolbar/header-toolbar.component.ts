import { Component } from '@angular/core';
import { UserService } from '../../../service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrl: './header-toolbar.component.css'
})
export class HeaderToolbarComponent {
logOut() {
  this.authService.logout();
  this.router.navigate(["/"]);
}
  constructor(private authService:UserService,private router:Router){}
}
