import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  actroute: string = '';

  constructor(private router: Router) {
      this.actroute = this.router.url;
  }

  ngOnInit(): void {
    console.log('Footer loaded');
  }

  
  /**
   * Navigates to URL impressum
   */
  goToImpressum(){
    this.router.navigateByUrl('/impressum'); 
  }

}
