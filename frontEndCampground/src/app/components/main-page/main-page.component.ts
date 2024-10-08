import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.state';
import { changeAdminPage, loadUser } from '../../store/user/user.action';
import { selectUser } from '../../store/user/user.selection';
import { Store } from '@ngrx/store';
import { user } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';
import { EditAddCampgroundComponent } from '../edit-add-campground/edit-add-campground.component';
import { ActivatedRoute } from '@angular/router';
import { loadCampgrounds } from '../../store/campground/campground.action';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
  isAdmin:boolean=false;
  parmPath:string | null='';
  user:user | null=null;
  
  constructor(private store:Store<AppState>,private dialog: MatDialog,private route:ActivatedRoute){
    this.store.dispatch(loadUser());
    this.store.select(selectUser).subscribe(x=>{
      if(x){
       this.user={...x,profilePicture:"http://localhost:3000/"+x?.profilePicture}
      }
      dialog.closeAll();
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
      if(param.has("admin")){
        this.parmPath=param.get("admin");
        this.isAdmin=this.parmPath==="admin";
        this.store.dispatch(changeAdminPage({page:this.isAdmin}));
        if(this.isAdmin){
          this.store.dispatch(loadCampgrounds({admin:"myCampgrounds",page:0,pageSize:5,search:""}));
        }
        else{
          this.store.dispatch(loadCampgrounds({admin:"",page:0,pageSize:5,search:""}));
        }
      }
      else{
        this.store.dispatch(loadCampgrounds({admin:"",page:0,pageSize:5,search:""}));
      }
    })
  }

  addDialog() {
    this.dialog.open(EditAddCampgroundComponent,{data:null,panelClass: 'scrollable-dialog'});
  }

  openDialog(){
    this.dialog.open(EditUserProfileComponent,{data:{...this.user,panelClass: 'scrollable-dialog'}});
  }
}
