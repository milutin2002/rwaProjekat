import { Component, Inject } from '@angular/core';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { addCampground, updateCampground } from '../../store/campground/campground.action';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { campground } from '../../../models/campground';

@Component({
  selector: 'app-edit-add-campground',
  templateUrl: './edit-add-campground.component.html',
  styleUrl: './edit-add-campground.component.css'
})
export class EditAddCampgroundComponent {

  postaviOglas() {
    const formData=new FormData();
    formData.append("title",this.title);
    formData.append("content",this.content);
    formData.append("deletedImages",JSON.stringify(this.delete));
    formData.append("userId",this.userId.toString());
    formData.append("id",this.id.toString());
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append("files",this.selectedFiles[i].file);
    }
    if(!this.editMode){
      this.store.dispatch(addCampground({formData:formData}));
    }
    else{
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
      this.pictures=data.images.map(b=>b.fileName);
    }
  }
  selectedFiles: any[] = [];
  id=0
  title: string='';
  content: string='';
  pictures: string[]=[];
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
