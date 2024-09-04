import { AfterViewInit, Component } from '@angular/core';
import { campground } from '../../models/campground';
import { debounceTime, fromEvent, map, Observable, of } from 'rxjs';
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
export class CampgroundsPostsComponent implements AfterViewInit {
  page:number=0;
  pageSize:number=5;
  search='';
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
  ngAfterViewInit(): void {
    var doc=document.getElementsByClassName('search');
    if(doc){
      fromEvent(doc,'input').pipe(debounceTime(500),map((ev:Event)=>(<HTMLInputElement>ev.target).value)).subscribe(x=>{
        if(this.isAdminPage){
          this.store.dispatch(loadCampgrounds({admin:"myCampgrounds",page:this.page,pageSize:this.pageSize,search:x}));
        }
        else{
          this.store.dispatch(loadCampgrounds({admin:"",page:this.page,pageSize:this.pageSize,search:x}));
        }
      })
    }
  }
  
  select(campgroundSelected:number){
    this.store.dispatch(selectCampgrounds({campground:campgroundSelected}));
  }
  onChangedPage(pageData: PageEvent){ 
    this.page=pageData.pageIndex;
    this.pageSize=pageData.pageSize;
    if(!this.isAdminPage){
    this.store.dispatch(loadCampgrounds({admin:"",page:this.page,pageSize:this.pageSize,search:this.search}));
    }
    else{
      this.store.dispatch(loadCampgrounds({admin:"myCampgrounds",page:this.page,pageSize:this.pageSize,search:this.search}));
    }
  } 
}
