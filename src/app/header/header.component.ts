import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  token: any = '';

  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit(): void {
  }

  logoutUser(){
    console.log('POST-Request to Backend to logout'); 
    this.token = localStorage.getItem('token');
   this.servReqService.logoutUser({'token': this.token}).subscribe((data: {}) => {
     let response: any = data;
     console.log('Delete the Token of the User! ', response);
     localStorage.removeItem('token');
     console.log('Go to Logout-Site');
     this.router.navigateByUrl('/logout');  
   });

  }
}
