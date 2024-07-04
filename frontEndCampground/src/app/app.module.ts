import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampgroundsPostsComponent } from './components/campgrounds-posts/campgrounds-posts.component';
import { CampgroundPostComponent } from './components/campground-post/campground-post.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {CampgroundState, campgroundReducer} from './store/campground/campground.reduce';
import { CampgroundPartComponent } from './components/campground-part/campground-part.component'
import { AppState } from './app.state';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,CampgroundsPostsComponent,CampgroundPostComponent, CampgroundPartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,StoreModule.forRoot<AppState>({campgrounds:campgroundReducer}),StoreDevtoolsModule.instrument({
      maxAge:25
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
