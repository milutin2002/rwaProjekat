import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampgroundsPostsComponent } from './components/campgrounds-posts/campgrounds-posts.component';
import { CampgroundPostComponent } from './components/campground-post/campground-post.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import {CampgroundState, campgroundReducer} from './store/campground/campground.reduce';
import { CampgroundPartComponent } from './components/campground-part/campground-part.component'
import { AppState } from './app.state';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { CampgroundEffects } from './store/campground/campground.effect';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthInterceptor } from './interceptor/interceptor';
import { userReducer } from './store/user/user.reduce';
import { UserEffects } from './store/user/user.effect';
import { EditUserProfileComponent } from './components/edit-user-profile/edit-user-profile.component';
import {MatDialogModule, matDialogAnimations} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,CampgroundsPostsComponent,CampgroundPostComponent, CampgroundPartComponent, RegisterComponent, LoginComponent, MainPageComponent, EditUserProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,StoreModule.forRoot<AppState>({campgrounds:campgroundReducer,user:userReducer}),StoreDevtoolsModule.instrument({
      maxAge:25
    }),EffectsModule.forRoot([CampgroundEffects,UserEffects]),MatCardModule,MatFormFieldModule,MatDividerModule,FormsModule,MatInputModule,MatButtonModule,ReactiveFormsModule,BrowserAnimationsModule,MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
