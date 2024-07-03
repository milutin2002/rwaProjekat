import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampgroundsPostsComponent } from './components/campgrounds-posts/campgrounds-posts.component';
import { CampgroundPostComponent } from './components/campground-post/campground-post.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {campgroundReducer} from './store/campground/campground.reduce';
import { CampgroundPartComponent } from './components/campground-part/campground-part.component'

@NgModule({
  declarations: [
    AppComponent,CampgroundsPostsComponent,CampgroundPostComponent, CampgroundPartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,StoreModule.forRoot({campgrounds:campgroundReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
