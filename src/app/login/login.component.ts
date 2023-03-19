import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  email ='';
  password='';
  
  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit(): void {
  }

    loginUser() {
       console.log('POST-Request to Backend with Login Data');
       //console.log('E-Mail: ',this.email);  
       //console.log('Password: ',this.password);
 
      let loginData = {username: this.email, password: this.password};
      console.log(loginData);

      this.servReqService.loginUser(loginData).subscribe((data: {}) => {
        //this.router.navigate(['/employees-list']);
        console.log(data);

        //localStorage.setItem('token', json.token);
        console.log('Save the Token of the User for further Requests');
       //localStorage.setItem('token',resp['token']); //token in den LocalStorage schreiben
        console.log('Go to Video-Site');
        //this.router.navigateByUrl('/videos');  
      });
    }

  goToRegister(){
    this.router.navigateByUrl('/register'); 
  }



}
