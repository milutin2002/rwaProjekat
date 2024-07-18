import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthGuard } from './guard/AuthGuard';
import { NoAuthGuard } from './guard/NoAuthGuard';

const routes: Routes = [{path:'',component:LoginComponent,canActivate:[NoAuthGuard]},{path:'registracija',component:RegisterComponent,canActivate:[NoAuthGuard]},{path:"main",component:MainPageComponent,canActivate:[AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
