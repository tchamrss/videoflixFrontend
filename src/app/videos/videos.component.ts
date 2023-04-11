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
vidsrc: string = '';

  constructor(private router: Router, private servReqService: ServerRequestService) {

   }

  ngOnInit() {
   console.log('HIER');
   console.log('GET-Request to Backend for Videos');
   console.log(this.servReqService.APIurl);
   this.servReqService.getVideos().subscribe((data: {}) => {


    

    this.videos = data;
    console.log(this.videos);
    console.log(this.videos[0].id);
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

  showVideo(videoId: any){
    console.log('Hello');
    (<HTMLInputElement>document.getElementById('video-container')).classList.remove('d-none');
    this.vidsrc = `${this.servReqService.APIurl}${this.videos[videoId-1].video_file}`;
  }

  showInfoCard(videoId: any){

  }


  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    let elementId: string = (event.target as Element).id;
    
    if(elementId != ''){ //To avoid Syntac-Error at Elements without ID
    //To close the video-box
    if(elementId == 'video-close' || elementId == 'video-close2'){
      //console.log(event.target);
       this.closeVideo();
    }
    //To show the correct video inside the video-box
    if(Number.isInteger(Number(elementId))){
      //console.log(event.target);
       this.showVideo(Number(elementId));
    };
    }
  }

}
