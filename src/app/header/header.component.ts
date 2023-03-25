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
  actroute: string = '';

  constructor(private router: Router, private servReqService: ServerRequestService) {
      this.actroute = this.router.url;
  }

  ngOnInit(): void {

  }

  logoutUser(){
    this.showSpinner();
    console.log('POST-Request to Backend to logout'); 
    this.token = localStorage.getItem('token');

   this.servReqService.logoutUser({'token': this.token}).subscribe({
    next: (data: {}) => {
      console.log(data);
      let response: any = data;
      //console.log('Delete the Token of the User! ', response);
      localStorage.removeItem('token');
      //console.log('Go to Logout-Site');
      this.router.navigateByUrl('/logout');
    },
    error: (error: any) => {
      //console.log('Fehler beim Einloggen:', error);
      //console.log('Fehler beim Einloggen:', error.status);
      //this.showErrorMessage(error.statusText);
    }
  });
  this.hideSpinner();
  }

  goToLogin(){
    this.router.navigateByUrl('/login'); 
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

}
