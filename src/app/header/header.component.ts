import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input() userDetails = { email: '', password: '', password2: '', token: '' };

  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit(): void {
  }

  logoutUser(){
    console.log('POST-Request to Backend to logout');
    console.log('WICHTIG: Wenn nur Länge token != 0, DANN ist es ein Logoutversuch'); 

   this.servReqService.logoutUser(this.userDetails).subscribe((data: {}) => {
     //this.router.navigate(['/employees-list']);
     console.log(data);
     console.log('Delete the Token of the User!');
     console.log('Go to Logout-Site');
     //this.router.navigateByUrl('/logout');  
   });



    console.log('Go to Logout-Site');
    this.router.navigateByUrl('/logout'); 
  }
}
