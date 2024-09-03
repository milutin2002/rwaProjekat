import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user-service.service';
import { debounceTime, filter, fromEvent, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements AfterViewInit{
  pas: any;
  username:string='';
  passwordLengthValid: boolean = false;
  passwordHasNumber: boolean = false;
  passwordHasCapital: boolean = false;
  doubleUsername:boolean=false;
  usernameFormControl = new FormControl('', [Validators.required]);

  constructor(private router: Router,private service:UserService) {
      
  }

  ngAfterViewInit(): void {
    var doc=document.getElementsByClassName('username');
    if(doc){
    fromEvent(doc,'input').pipe(debounceTime(500),map((ev:Event)=>(<HTMLInputElement>ev.target).value),filter(x=>x.length>0),switchMap(x=>this.service.doubleUsername(x))).subscribe(x=>{
        this.doubleUsername=x;
        this.usernameFormControl.updateValueAndValidity();
        console.log(x);
    })
    }
  }

  checkPassword() {
    const lengthRegex = /^.{8,20}$/;
    const numberRegex = /\d/;
    const capitalLetterRegex = /[A-Z]/;

    this.passwordLengthValid = lengthRegex.test(this.pas);
    this.passwordHasNumber = numberRegex.test(this.pas);
    this.passwordHasCapital = capitalLetterRegex.test(this.pas);
  }
  
  isFormValid(): boolean {
    return this.usernameFormControl.valid && this.passwordLengthValid && this.passwordHasNumber && this.passwordHasCapital && this.doubleUsername;
  }

  navigateToNext() {
    this.service.register({username:this.username,password:this.pas}).subscribe((u)=>{
      this.router.navigate(["/"]);
    })
  }
}
