import { Component } from '@angular/core';
import { campground } from '../../../models/campground';
import {CampgroundState} from '../../store/campground/campground.reduce'
@Component({
  selector: 'app-campground-part',
  templateUrl: './campground-part.component.html',
  styleUrl: './campground-part.component.scss'
})
export class CampgroundPartComponent {
campground: campground | null=null;

}
