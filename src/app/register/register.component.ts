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

  registerUser(){
    let registerData = {username: this.username, email: this.email, password: this.password};
    console.log('POST-Request to Backend with Login Data: ',registerData);


   if(this.password == this.password2){
    this.servReqService.registerUser(registerData).subscribe((data: {}) => {
      console.log(data);
      let response: any = data;
      console.log('Registration successful! ',response);
      console.log('Go to Login-Site');
      this.router.navigateByUrl('/login');  
    });
   } 
   else{
    console.log('Passwords are not equal!');
   }


  }

}
