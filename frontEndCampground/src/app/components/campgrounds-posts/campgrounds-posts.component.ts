import { Component } from '@angular/core';
import { campground } from '../../models/campground';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {  loadCampgrounds, selectCampgrounds } from '../../store/campground/campground.action';
import { selectCampgroundList } from '../../store/campground/campground.selection';
import { AppState } from '../../app.state';
import { PageEvent } from '@angular/material/paginator';
import { selectPage } from '../../store/user/user.selection';

@Component({
  selector: 'app-campgrounds-posts',
  templateUrl: './campgrounds-posts.component.html',
  styleUrl: './campgrounds-posts.component.scss'
})
export class CampgroundsPostsComponent {
  page:number=0;
  pageSize:number=5
  pageSizeOption = [1,3,5,10];
  totalPosts:number=100;
  isAdminPage:boolean=true;
  campgrounds$:Observable<campground[]>=of([]);
  
  constructor(private store:Store<AppState>){
    this.campgrounds$=this.store.select(selectCampgroundList);
    this.store.select(selectPage).subscribe(x=>{
      this.isAdminPage=x;
    })
  }
  
  select(campgroundSelected:number){
    this.store.dispatch(selectCampgrounds({campground:campgroundSelected}));
  }
  onChangedPage(pageData: PageEvent){ 
    this.page=pageData.pageIndex;
    this.pageSize=pageData.pageSize;
    if(!this.isAdminPage){
    this.store.dispatch(loadCampgrounds({admin:"",page:this.page,pageSize:this.pageSize}));
    }
    else{
      this.store.dispatch(loadCampgrounds({admin:"myCampgrounds",page:this.page,pageSize:this.pageSize}));
    }
  } 
}
