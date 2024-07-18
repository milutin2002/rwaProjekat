import { Component } from '@angular/core';
import { UserService } from '../../../service/user-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  constructor(private userService:UserService){
    userService.getProfile().subscribe(x=>{
      console.log(x);
    })
  }
}
