import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email ='';
  password='';
  
  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit(): void {
  }

    loginUser() {
      this.showSpinner();

      let loginData = {email: this.email, username: '', password: this.password};

      if(this.dataIsValid()){

        //console.log('POST-Request to Backend with Login Data: ',loginData);
        this.servReqService.loginUser(loginData).subscribe({
          next: (data: {}) => {
            console.log(data);
            let response: any = data;
            localStorage.setItem('token', response['token']);
            //console.log('Token gespeichert: ', response['token']);
            //console.log('Go to Video-Site');
            this.router.navigateByUrl('/videos');
          },
          error: (error: any) => {
            console.log('Fehler beim Einloggen:', error);
            //console.log('Fehler beim Einloggen:', error.status);
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



  showErrorMessage(errmessage: string){
    (<HTMLInputElement>document.getElementById('error-message')).innerHTML = errmessage;
    (<HTMLInputElement>document.getElementById('error-message')).classList.remove('d-none');
    (<HTMLInputElement>document.getElementById('error-message')).classList.add('d-inline');    
  }

  dataIsValid(){
    this.checkPasswordLength();
    this.checkEmail();
    return this.checkPasswordLength() && this.checkEmail();
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
