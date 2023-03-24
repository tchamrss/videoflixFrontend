import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  username: string = '';
  email: string = ''; 
  password: string = '';
  password2: string = '';

  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit(): void {
  }


  registerUser() {
    this.showSpinner();

    let registerData = {username: this.username, email: this.email, password: this.password};

    if(this.dataIsValid()){

      console.log('POST-Request to Backend with Registration Data: ',registerData);
      this.servReqService.registerUser(registerData).subscribe({
        next: (data: {}) => {
          console.log(data);
          let response: any = data;
         //console.log('Go to Login-Site');
         //this.router.navigateByUrl('/login');  
        },
        error: (error: any) => {
          console.log('Fehler beim Einloggen:', error);
          console.log('Fehler beim Einloggen:', error.status);
          this.showErrorMessage(error.statusText);
        }
      });
    }
    else
    {
      console.log('data not valid');
    }
    this.hideSpinner();
  }


showSpinner(){
  (<HTMLInputElement>document.getElementById('btn')).classList.add('red-col');
  (<HTMLInputElement>document.getElementById('spinner')).classList.remove('d-none');
  (<HTMLInputElement>document.getElementById('spinner')).classList.add('d-block'); 
}

hideSpinner(){
  (<HTMLInputElement>document.getElementById('btn')).classList.remove('red-col');
  (<HTMLInputElement>document.getElementById('spinner')).classList.add('d-none');
  (<HTMLInputElement>document.getElementById('spinner')).classList.remove('d-block'); 
}


showErrorMessage(errmessage: string){
  (<HTMLInputElement>document.getElementById('error-message')).innerHTML = errmessage;
  (<HTMLInputElement>document.getElementById('error-message')).classList.remove('d-none');
  (<HTMLInputElement>document.getElementById('error-message')).classList.add('d-inline');    
}

dataIsValid(){
  this.checkUsernameLength();
  this.checkPasswordsEqual();
  this.checkPasswordLength();
  this.checkEmail();
  return this.checkUsernameLength() && this.checkPasswordsEqual() && this.checkPasswordLength() && this.checkEmail();
}

checkPasswordLength(){
       if(this.password.length < 4){
        (<HTMLInputElement>document.getElementById('input-notice-password')).classList.remove('d-none');
        (<HTMLInputElement>document.getElementById('input-notice-password')).classList.add('d-flex');  
       }else{
        (<HTMLInputElement>document.getElementById('input-notice-password')).classList.add('d-none');
        (<HTMLInputElement>document.getElementById('input-notice-password')).classList.remove('d-flex');  
       };
       return (this.password.length >= 4);
};

checkUsernameLength(){
  if(this.username.length < 4){
    (<HTMLInputElement>document.getElementById('input-notice-username')).classList.remove('d-none');
    (<HTMLInputElement>document.getElementById('input-notice-username')).classList.add('d-flex');  
   }else{
    (<HTMLInputElement>document.getElementById('input-notice-username')).classList.add('d-none');
    (<HTMLInputElement>document.getElementById('input-notice-username')).classList.remove('d-flex');  
   };
   return (this.username.length >= 4);
}

checkEmail() {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!pattern.test(this.email)){
    (<HTMLInputElement>document.getElementById('input-notice-email')).classList.remove('d-none');
    (<HTMLInputElement>document.getElementById('input-notice-email')).classList.add('d-flex');  
   }else{
    (<HTMLInputElement>document.getElementById('input-notice-email')).classList.add('d-none');
    (<HTMLInputElement>document.getElementById('input-notice-email')).classList.remove('d-flex');  
   };
  return pattern.test(this.email);
}

checkPasswordsEqual(){
  if(this.password !== this.password2){
    (<HTMLInputElement>document.getElementById('input-notice-password')).innerHTML = 'The two passwords have to be equal.';
    (<HTMLInputElement>document.getElementById('input-notice-password')).classList.remove('d-none');
    (<HTMLInputElement>document.getElementById('input-notice-password')).classList.add('d-flex');  
   }else{
    (<HTMLInputElement>document.getElementById('input-notice-password')).innerHTML = 'Your password must contain at least 4 characters.';
    (<HTMLInputElement>document.getElementById('input-notice-password')).classList.add('d-none');
    (<HTMLInputElement>document.getElementById('input-notice-password')).classList.remove('d-flex');  
   };
  return this.password == this.password2;
}







}
