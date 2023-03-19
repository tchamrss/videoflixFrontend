import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})

export class VideosComponent implements OnInit {
  
videos: any = [];
id: number = 0;
title: string = '';
description: string = '';
playtime: string = '';
genres: string = '';
likes: number = 0;
picture: string = '';
date: Date = new Date();
videofile: string = '';


  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit() {
   console.log('HIER');
   console.log('GET-Request to Backend for Videos');

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
