import { Component } from '@angular/core';
import { UserService } from '../../../service/user-service.service';
import { AppState } from '../../app.state';
import { loadUser } from '../../store/user/user.action';
import { selectUser } from '../../store/user/user.selection';
import { Store } from '@ngrx/store';
import { user } from '../../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { EditAddCampgroundComponent } from '../edit-add-campground/edit-add-campground.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  addDialog() {
    this.dialog.open(EditAddCampgroundComponent);
  }
  user:user | null=null;
  constructor(private store:Store<AppState>,private dialog: MatDialog){
    this.store.dispatch(loadUser());
    this.store.select(selectUser).subscribe(x=>{
      if(x){
       this.user={...x,profilePicture:"http://localhost:3000/"+x?.profilePicture}
      }
      dialog.closeAll();
    })
  }
  openDialog(){
    this.dialog.open(EditUserProfileComponent,{data:{...this.user}});
  }
}
