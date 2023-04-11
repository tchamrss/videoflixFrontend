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

  
  constructor(private router: Router, private servReqService: ServerRequestService) {}


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


  changeVideo(id: any) {
    this.servReqService.updateVideo(id).subscribe((data: {}) => {
      console.log(data);
      let response: any = data;
      console.log('Change successful! ', response);
    });
  }


/**
 * Closes a video from playing with the video-player
 */
  closeVideo() {
    (<HTMLInputElement>document.getElementById('video-container')).classList.add('d-none');
  }


  /**
   * Shows a video with the video-player
   * @param videoId id of the video
   */
  showVideo(videoId: any) {
    (<HTMLInputElement>document.getElementById('video-container')).classList.remove('d-none');
    this.vidsrc = `${this.servReqService.APIurl}${this.videos[videoId - 1].video_file}`;
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
    }
  }

}
