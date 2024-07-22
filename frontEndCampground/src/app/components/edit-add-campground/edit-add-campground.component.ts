import { Component } from '@angular/core';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import { addCampground } from '../../store/campground/campground.action';

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
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append("files",this.selectedFiles[i].file);
    }
    this.store.dispatch(addCampground({formData:formData}));
  }
  constructor(private store:Store<AppState>){}
  selectedFiles: any[] = [];
  title: string='';
  content: string='';
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
