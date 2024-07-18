import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  pas: any;
  username:string='';
  passwordLengthValid: boolean = false;
  passwordHasNumber: boolean = false;
  passwordHasCapital: boolean = false;
  checkPassword() {
    const lengthRegex = /^.{8,20}$/;
    const numberRegex = /\d/;
    const capitalLetterRegex = /[A-Z]/;

    this.passwordLengthValid = lengthRegex.test(this.pas);
    this.passwordHasNumber = numberRegex.test(this.pas);
    this.passwordHasCapital = capitalLetterRegex.test(this.pas);
  }
  
  constructor(private router: Router,private service:UserService) {}

  usernameFormControl = new FormControl('', [Validators.required]);

  isFormValid(): boolean {
    return this.usernameFormControl.valid && this.passwordLengthValid && this.passwordHasNumber && this.passwordHasCapital;
  }

  navigateToNext() {
    this.service.register({username:this.username,password:this.pas}).subscribe((u)=>{
      console.log(u);
      this.router.navigate(["/"]);
    })
  }
}
