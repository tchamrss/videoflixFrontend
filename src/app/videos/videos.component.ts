import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})


export class VideosComponent implements OnInit {

/**
 * videos-array with the video-data from the GET-Request, vidsrc-variable to change the video-source for the video-player, actVidId which contains the Id of the opened video
 */
  videos: any = [];
  vidsrc: string = '';
  actVidId: string = '';

  constructor(private router: Router, private servReqService: ServerRequestService) {}


  /**
   * Fetches all videos from the backend with a GET-Request and saves them in the video-array
   */
  ngOnInit() {
      this.servReqService.getVideos().subscribe({
        next: (data: {}) => {
          this.videos = data;
        },
        error: (error: any) => {
          console.log(error['error'].error);
        }
      });
  }


/**
 * Closes a video from playing with the video-player
 */
  closeVideo() {
    (<HTMLInputElement>document.getElementById('video-container')).classList.add('d-none');
    (<HTMLInputElement>document.getElementById('res-480')).classList.add('bg-grey');
    (<HTMLInputElement>document.getElementById('res-720')).classList.remove('bg-grey');
    (<HTMLInputElement>document.getElementById('res-1080')).classList.remove('bg-grey');
  }


  /**
   * Shows a video with the video-player and saves the videoId in the variable actVidId
   * @param videoId id of the video
   */
  showVideo(videoId: any) {
    (<HTMLInputElement>document.getElementById('video-container')).classList.remove('d-none');
    this.actVidId = videoId;
    let filteredVideo = this.videos.filter((video: { id: any }) => video.id == videoId);
    this.vidsrc = `${this.servReqService.APIurl}${filteredVideo[0].video_file_480p}`;
  }


  /**
   * Shows Info-Card when mousepointer enters a certain video
   * @param e hover-event
   */
  showInfoCard(e: any) {
    let calculatedIdForCard;

    if (e.target.id.lastIndexOf('-') == -1) 
    { calculatedIdForCard = e.target.id }
    else 
    { calculatedIdForCard = e.target.id.slice(e.target.id.lastIndexOf('-') + 1, e.target.id.length) };

    (<HTMLInputElement>document.getElementById(`video-info-card-${calculatedIdForCard}`)).classList.remove('d-none');
  }


  /**
   * Hides Info-Card when mousepointer leaves a certain video
   * @param e hover-event
   */
  hideInfoCard(e: any) {
    let calculatedIdForCard;

    if (e.target.id.lastIndexOf('-') == -1) 
    { calculatedIdForCard = e.target.id }
    else 
    { calculatedIdForCard = e.target.id.slice(e.target.id.lastIndexOf('-') + 1, e.target.id.length) };

    (<HTMLInputElement>document.getElementById(`video-info-card-${calculatedIdForCard}`)).classList.add('d-none');
  }


  /**
   * Observes click-events in order to show a video with the video-player or close a video from playing with the video-player
   * @param event click-event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    let elementId: string = (event.target as Element).id;

    if (elementId != '') { //To avoid Syntax-Error at Elements without ID
      //To close the video-box
      if (elementId == 'video-close' || elementId == 'video-close2') 
      {this.closeVideo()};
      //To show the correct video inside the video-box
      if (Number.isInteger(Number(elementId))) 
      {this.showVideo(Number(elementId))};
      //To show the correct video inside the video-box
      if ((event.target as Element).id.slice(0,21)=='video-info-card-play-') 
      {this.showVideo(Number(elementId.slice(21,elementId.length)))};
      //To show the correct likes
      if ((event.target as Element).id.slice(0,21)=='video-info-card-like-') 
      {
      
      if((<HTMLInputElement>document.getElementById(elementId)).getAttribute('src') == '~/../assets/img/like-32.png'){
        (<HTMLInputElement>document.getElementById(elementId)).setAttribute('src','~/../assets/img/like-32-red.png');
        console.log('Like for video with id ',Number(elementId.slice(21,elementId.length)));
      }
      else{
        (<HTMLInputElement>document.getElementById(elementId)).setAttribute('src','~/../assets/img/like-32.png');
        console.log('De-Like for video with id ',Number(elementId.slice(21,elementId.length)));
      };
    };
    }
  }


  /**
   * Changes the resolution of the currently opened video to 480px, 720px or 1080px
   * @param wishedResolution String that contains the resolution: 480, 720 or 1080
   */
  changeResolutionTo(wishedResolution:string){
    let filteredVideo = this.videos.filter((video: { id: any }) => video.id == this.actVidId);
    if (wishedResolution == '480'){
      (<HTMLInputElement>document.getElementById('res-480')).classList.add('bg-grey');
      (<HTMLInputElement>document.getElementById('res-720')).classList.remove('bg-grey');
      (<HTMLInputElement>document.getElementById('res-1080')).classList.remove('bg-grey');
      this.vidsrc = `${this.servReqService.APIurl}${filteredVideo[0].video_file_480p}`;
    }
    else if (wishedResolution == '720'){
      (<HTMLInputElement>document.getElementById('res-480')).classList.remove('bg-grey');
      (<HTMLInputElement>document.getElementById('res-720')).classList.add('bg-grey');
      (<HTMLInputElement>document.getElementById('res-1080')).classList.remove('bg-grey');
      this.vidsrc = `${this.servReqService.APIurl}${filteredVideo[0].video_file_720p}`;
    }
    else if (wishedResolution == '1080'){
      (<HTMLInputElement>document.getElementById('res-480')).classList.remove('bg-grey');
      (<HTMLInputElement>document.getElementById('res-720')).classList.remove('bg-grey');
      (<HTMLInputElement>document.getElementById('res-1080')).classList.add('bg-grey');
      this.vidsrc = `${this.servReqService.APIurl}${filteredVideo[0].video_file_1080p}`;
    };
  }

}
