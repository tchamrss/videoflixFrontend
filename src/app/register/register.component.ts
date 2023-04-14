import { Component, Input, OnInit } from '@angular/core';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent implements OnInit {


/**
 * username-variable, email-variable, password-variable and password2-variable for the data from the Register-Form
 */
  username: string = '';
  email: string = ''; 
  password: string = '';
  password2: string = '';


/**
 * ServerRequestService get injected
 * @param servReqService ServerRequestService
 */
  constructor(private servReqService: ServerRequestService) { }


  ngOnInit(): void {
  }


  /**
   * Registers the user: User gets redirected to Login-Page
   */
  registerUser() {
    this.showSpinner();
    let registerData = {username: this.username, email: this.email, password: this.password};

    if(this.dataIsValid()){
      this.servReqService.registerUser(registerData).subscribe({
        next: (data: {}) => {
          let response: any = data;
          this.emptyRegisterForm();
          this.showRegistrationSuccessfullMessage(response.message);
        },
        error: (error: any) => {
          this.showErrorMessage(error['error'].error);
        }
      });
    };
    this.hideSpinner();
  }


/**
 * Shows Spinner while loading
 */
showSpinner(){
  (<HTMLInputElement>document.getElementById('btn')).classList.add('red-col');
  (<HTMLInputElement>document.getElementById('spinner')).classList.remove('d-none');
  (<HTMLInputElement>document.getElementById('spinner')).classList.add('d-block'); 
}


/**
 * Hides Spinner after loading has finished
 */
hideSpinner(){
  (<HTMLInputElement>document.getElementById('btn')).classList.remove('red-col');
  (<HTMLInputElement>document.getElementById('spinner')).classList.add('d-none');
  (<HTMLInputElement>document.getElementById('spinner')).classList.remove('d-block'); 
}


/**
 * Shows the Error-Container 'error-message' with the Error-Message from the Server
 * @param errmessage Error-Message from the Server
 */
showErrorMessage(errmessage: string){
  (<HTMLInputElement>document.getElementById('error-message')).innerHTML = errmessage;
  (<HTMLInputElement>document.getElementById('error-message')).classList.remove('d-none');
  (<HTMLInputElement>document.getElementById('error-message')).classList.add('d-inline');    
}


/**
 * Shows the Successfull-Container 'successfull-message' with the Successfull-Message from the Server
 * @param errmessage successfull-Message from the Server
 */
showRegistrationSuccessfullMessage(successmessage: string){
  (<HTMLInputElement>document.getElementById('success-message')).innerHTML = successmessage;
  (<HTMLInputElement>document.getElementById('success-message')).classList.remove('d-none');
  (<HTMLInputElement>document.getElementById('success-message')).classList.add('d-inline');    
}


/**
 * Checks if Register-Data is valid
 * @returns true if Register-Data valid, otherwise returns false
 */
dataIsValid(){
  this.checkUsernameLength();
  this.checkPasswordsEqual();
  this.checkPasswordLength();
  this.checkEmail();
  return this.checkUsernameLength() && this.checkPasswordsEqual() && this.checkPasswordLength() && this.checkEmail();
}


/**
 * Checks if length of the password is more than 4 
 * @returns true if length of the password is more than 4, otherwise returns false
 */
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


/**
 * Checks if length of the username is more than 4 
 * @returns true if length of the username is more than 4, otherwise returns false
 */
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


/**
 * Checks if email is valid
 * @returns true if email is valid, otherwise returns false
 */
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


/**
 * Checks if password and password2 are equal
 * @returns true if password and password2 are equal, otherwise returns false
 */
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


/**
 * Deletes all Entrys in the Register-Form if registration was successfull
 */
emptyRegisterForm(){
  this.username = '';
  this.email = ''; 
  this.password = '';
  this.password2 = '';
}

}
