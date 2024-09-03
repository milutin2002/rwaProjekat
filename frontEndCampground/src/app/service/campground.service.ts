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
  getCampgrounds(path:string):Observable<campground[]>{
    return this.httpClient.get<campground[]>("http://localhost:3000/campgrounds/"+path);
  }
  addCampground(formData:FormData):Observable<campground>{
    return this.httpClient.post<campground>("http://localhost:3000/campgrounds/",formData);
  }
  deleteCampground(id:number):Observable<number>{
    return this.httpClient.delete<number>("http://localhost:3000/campgrounds/"+id);
  }
  updateCampground(formData:FormData):Observable<campground>{
    return this.httpClient.put<campground>("http://localhost:3000/campgrounds/",formData);
  }
}
