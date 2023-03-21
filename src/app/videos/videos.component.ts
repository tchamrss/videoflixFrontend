import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})

export class VideosComponent implements OnInit {
  
videos: any = [];
APIurl: string = environment.baseUrl;



  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit() {
   console.log('HIER');
   console.log('GET-Request to Backend for Videos');
   console.log(this.APIurl);
   this.servReqService.getVideos().subscribe((data: {}) => {
    console.log(data);
    this.videos = data;
   });

  }


  changeVideo(id: any){
    this.servReqService.updateVideo(id).subscribe((data: {}) => {
      console.log(data);
      let response: any = data;
      console.log('Change successful! ',response);
    });
  }


}
