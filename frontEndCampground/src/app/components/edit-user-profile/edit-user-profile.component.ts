import { AfterViewInit, Component, Inject } from '@angular/core';
import { MainPageComponent } from '../main-page/main-page.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { user } from '../../../models/user';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { updateUser } from '../../store/user/user.action';
import { debounceTime, filter, fromEvent, map, switchMap } from 'rxjs';
import { UserService } from '../../../service/user-service.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css'
})
export class EditUserProfileComponent implements AfterViewInit {
selectedFile: any;
editujProfil() {
  const formData=new FormData();
  formData.append('username',this.data.username);
  formData.append('file',this.selectedFile);
  this.store.dispatch(updateUser({data:formData}));
}
doubleUsername:boolean=false;
isValid():boolean{
  return this.doubleUsername;
}
closeDialog() {
  this.dialogRef.close();
}
onFileSelected($event: any) {
  this.selectedFile = $event.target.files[0] as File;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.width = 150;
          canvas.height = 150;
          ctx.drawImage(img, 0, 0, 150, 150);
          const dataURL = canvas.toDataURL('image/jpeg');
          this.data.profilePicture = dataURL;
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);  
}
}
  constructor(
    public dialogRef: MatDialogRef<MainPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: user,private store:Store<AppState>,private service:UserService
  ) {}
  ngAfterViewInit(): void {
    var doc=document.getElementsByClassName('username');
    if(doc){
    fromEvent(doc,'input').pipe(debounceTime(500),map((ev:Event)=>(<HTMLInputElement>ev.target).value),filter(x=>x.length>0),switchMap(x=>this.service.doubleUsername(x))).subscribe(x=>{
        this.doubleUsername=x;
    })
    }
  }
}
