import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ViewChild('emailField') emailField!: ElementRef; //To contact #emailField of the HTML-Code
  // @ViewChild('passwordField') passwordField!: ElementRef; //To contact #passwordField of the HTML-Code


  email ='';
  password='';
  
  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit(): void {
  }

    loginUser() {
      let loginData = {email: this.email, username: '', password: this.password};
      console.log('POST-Request to Backend with Login Data: ',loginData);

      this.servReqService.loginUser(loginData).subscribe((data: {}) => {
        console.log(data);
        let response: any = data;
        localStorage.setItem('token', response['token']);
        console.log('Token gespeichert: ', response['token']);
        console.log('Go to Video-Site');
        this.router.navigateByUrl('/videos');  
      });
    }

  goToRegister(){
    this.router.navigateByUrl('/register'); 
  }




}
