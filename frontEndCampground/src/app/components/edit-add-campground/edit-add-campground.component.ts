import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-add-campground',
  templateUrl: './edit-add-campground.component.html',
  styleUrl: './edit-add-campground.component.css'
})
export class EditAddCampgroundComponent {
  postaviOglas() {

  }
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
