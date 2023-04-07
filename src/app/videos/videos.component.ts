import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})

export class VideosComponent implements OnInit {
  
videos: any = [];



  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit() {
   console.log('HIER');
   console.log('GET-Request to Backend for Videos');
   console.log(this.servReqService.APIurl);
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

  closeVideo(){
    (<HTMLInputElement>document.getElementById('video-container')).classList.add('d-none');

  }

  showVideo(videopath: string){
    (<HTMLInputElement>document.getElementById('video-container')).classList.remove('d-none');
    (<HTMLInputElement>document.getElementById('vidsrc')).setAttribute('src',`${this.servReqService.APIurl}${videopath}`);
    console.log(videopath);
  }
  
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    let elementId: string = (event.target as Element).id;
    if(elementId == 'video-close'){
      console.log(event.target);
       this.closeVideo();
    }
  }

}
