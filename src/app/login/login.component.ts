import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {


/**
 * email-variable and password-variable for the data from the Login-Form
 */
 email ='';
 password ='';
  

/**
 * Router & ServerRequestService get injected
 * @param router Router-Service
 * @param servReqService ServerRequestService
 */
  constructor(private router: Router, private servReqService: ServerRequestService) { }


  ngOnInit(): void {
  }


  /**
   * Logs in the user: Token gets saved in Local-Storage and User gets redirected to Video-Page
   */
    loginUser() {
      this.showSpinner();
      let loginData = {email: this.email, username: '', password: this.password};

      if(this.dataIsValid()){
        this.servReqService.loginUser(loginData).subscribe({
          next: (data: {}) => {
            let response: any = data;
            localStorage.setItem('token', response['token']);
            this.router.navigateByUrl('/videos');
          },
          error: (error: any) => {
            console.log('Login-Error: ', error,' Status: ',error.status,' StatusText: ',error.statusText);
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

  
  /**
   * Navigates to URL register
   */  
  goToRegister(){
    this.router.navigateByUrl('/register'); 
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
   * Checks if Login-Data is valid
   * @returns true if Login-Data valid, otherwise returns false
   */
  dataIsValid(){
    this.checkPasswordLength();
    this.checkEmail();
    return this.checkPasswordLength() && this.checkEmail();
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

}
