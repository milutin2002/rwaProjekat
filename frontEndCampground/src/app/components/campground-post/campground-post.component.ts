import { Component, EventEmitter, Input, Output } from '@angular/core';
import { campground } from '../../../models/campground';

@Component({
  selector: 'app-campground-post',
  templateUrl: './campground-post.component.html',
  styleUrl: './campground-post.component.scss'
})
export class CampgroundPostComponent {
@Input()campground: campground|null=null;
@Output()onClick:EventEmitter<campground>=new EventEmitter<campground>();
}
