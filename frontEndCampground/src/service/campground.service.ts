import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { campground } from '../models/campground';

@Injectable({
  providedIn: 'root'
})
export class CampgroundService {

  constructor(private httpClient:HttpClient) {

   }
  getCampgrounds():Observable<campground[]>{
    return this.httpClient.get<campground[]>("http://localhost:3000/campgrounds");
  }
}
