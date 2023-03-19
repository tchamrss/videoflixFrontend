import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  
  videos = [];

  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit() {
   console.log('HIER');
   console.log('GET-Request to Backend for Videos');

   this.servReqService.getVideos().subscribe((data: {}) => {
     //this.router.navigate(['/employees-list']);
     console.log(data);
     console.log('Delete the Token of the User!');
     console.log('Go to Logout-Site');
     //this.router.navigateByUrl('/logout');  
   });

  }


  async loadPoke(){
    try{
      let resp = await this.servReqService.getPokemons();
      console.log('Answer: ',resp);
    }
    catch (e){
      console.log('Error: ',e);
    }
  }


}
