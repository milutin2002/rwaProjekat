import { Component, Inject } from '@angular/core';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { addCampground, updateCampground } from '../../store/campground/campground.action';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { campground } from '../../../models/campground';
import { images } from '../../../models/images';

@Component({
  selector: 'app-edit-add-campground',
  templateUrl: './edit-add-campground.component.html',
  styleUrl: './edit-add-campground.component.css'
})
export class EditAddCampgroundComponent {
deletePicture(i:number,id: number) {
  if(!this.checkedValues[i]){
    this.delete.push(id);
  }
  else{
    this.delete=this.delete.filter(b=>b!=id);
  }
  console.log(this.delete);
}

  postaviOglas() {
    const formData=new FormData();
    formData.append("title",this.title);
    formData.append("content",this.content);
    /*for (let i = 0; i < this.delete.length; i++) {
      formData.append("deletedImages",this.delete[i].toString());
    }*/
    formData.append("userId",this.userId.toString());
    console.log(this.id);
    formData.append("id",this.id.toString());
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append("files",this.selectedFiles[i].file);
    }
    for (let i = 0; i < this.delete.length; i++) {
      formData.append("deletedImages",this.delete[i].toString());
    }
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
  });
    if(!this.editMode){
      this.store.dispatch(addCampground({formData:formData}));
    }
    else{
      console.log("Sending update");
      this.store.dispatch(updateCampground({formData:formData}));
    }
    this.dialogRef.close();
  }
  constructor(private store:Store<AppState>,public dialogRef: MatDialogRef<EditAddCampgroundComponent>,@Inject(MAT_DIALOG_DATA) public data:campground | null){
    if(data){
      this.editMode=true;
      this.id=data.id;
      this.title=data.title;
      this.content=data.content;
      this.userId=data.userId;
      this.pictures=data.images;
      for (let i = 0; i < this.pictures.length; i++) {
        this.checkedValues.push(false);
      }
    }
  }
  checkedValues:boolean[]=[];
  selectedFiles: any[] = [];
  id=0
  title: string='';
  content: string='';
  pictures: images[]=[];
  delete:number[]=[];
  userId:number=0;
  editMode=false;
  autoGrow(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  onSelectFiles(): void {
    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    fileInput?.click();
  }

  onFilesSelected(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.selectedFiles.push({ file, url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }
}
