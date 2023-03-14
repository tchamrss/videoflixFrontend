import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../server-request.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  email:string = '';
  password:string = '';

  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit(): void {
  console.log('E-Mail: ',this.email);  
  console.log('Password: ',this.password);  
  }


  login(){
    // console.log('POST-Request to Backend with Login Data');
    // console.log('E-Mail: ',this.email);  
    // console.log('Password: ',this.password);  
    this.servReqService.tryLoginUser(this.email,this.password);
    

    console.log('Go to Video-Site');
    //this.router.navigateByUrl('/videos');  
  }

  register(){
    console.log('Go to Register-Site');
    this.router.navigateByUrl('/register'); 
  }
}
