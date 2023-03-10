import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  
  tryLogin(){
    console.log('POST-Request to Backend with Login Data');
    console.log('Go to Video-Site');
    this.router.navigateByUrl('/videos');  
  }

  goToRegister(){
    console.log('Go to Register-Site');
    this.router.navigateByUrl('/register'); 
  }
}
