import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  

/**
 * token-variable and variable for actual url-route
 */
token: any = '';
actroute: string = '';


/**
 * Router & ServerRequestService get injected
 * @param router Router-Service
 * @param servReqService ServerRequestService
 */
  constructor(private router: Router, private servReqService: ServerRequestService) {
      this.actroute = this.router.url; //Actual route is saved as soon as header is created to modify header when on Videos-Page
  }


  ngOnInit(): void {

  }

  
  /**
   * Logs out the user: Token gets deleted and User gets redirected to Logout-Page
   */
  logoutUser(){
    this.showSpinner();
    this.token = localStorage.getItem('token');

   this.servReqService.logoutUser({'token': this.token}).subscribe({
    next: (data: {}) => {
      localStorage.removeItem('token'); //Token gets deleted
      this.router.navigateByUrl('/logout'); //Redirect to Logout-Page
    },
    error: (error: any) => {
      //console.log('Logout-Error: ', error,' Status: ',error.status,' StatusText: ',error.statusText);
    }
  });
    this.hideSpinner();
  }


  /**
   * Navigates to URL login
   */
  goToVideoPage(){
    this.router.navigateByUrl('/videos'); 
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

}
