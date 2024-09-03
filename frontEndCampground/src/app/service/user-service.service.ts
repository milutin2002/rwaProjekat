import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userDto } from '../dtoEntities/userDto';
import { from, map, Observable } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  logout() {
    localStorage.removeItem("jwtToken");
  }
  getToken():string | null {
      if(localStorage.getItem("jwtToken")){
        return localStorage.getItem("jwtToken");
      }
      return null;
  }
  
  constructor(private httpClient:HttpClient) { }
  register(userDto:userDto):Observable<user>{
      return this.httpClient.post<user>("http://localhost:3000/users/register",userDto);
  }
  login(userDto:userDto){
      return this.httpClient.post<{"access_token":string}>("http://localhost:3000/auth/login",userDto);
  }
  getProfile(){
    return this.httpClient.get<user>("http://localhost:3000/auth/profile");
  }
  updateProfile(data:FormData){
    return this.httpClient.put<user>("http://localhost:3000/users",data);
  }
  doubleUsername(username:string):Observable<boolean>{
      return from(fetch("http://localhost:3000/users/"+username).then(res=>res.json()));
  }
}
