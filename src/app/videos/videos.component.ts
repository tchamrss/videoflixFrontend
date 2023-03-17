import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  
  @Input() userDetails = { email: '', password: '', password2: '', token: '' };

  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit(): void {
   console.log('HIER');
  }


  logoutUser(){
    console.log('GET-Request to Backend for Videos');
    console.log('WICHTIG: Wenn nur Länge token != 0, DANN ist es ein GET-Video-Request'); 

   this.servReqService.getVideos(this.userDetails).subscribe((data: {}) => {
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
