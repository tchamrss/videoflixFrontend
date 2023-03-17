import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  @Input() userDetails = { email: '', password: '', password2: '', token: '' };
  
  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit(): void {
  }

    loginUser(dataForUser: any) {
       console.log('POST-Request to Backend with Login Data');
       console.log('E-Mail: ',this.userDetails.email);  
       console.log('Password: ',this.userDetails.password);
       console.log('Password2: ',this.userDetails.password2);
       console.log('Token: ',this.userDetails.token);     
       console.log('WICHTIG: Wenn Länge des ersten PWS > 0 und Länge von PW2 == 0, DANN ist es ein Loginversuch'); 
       console.log('User: ',this.userDetails);
       let loginData = {username: 'tullrich', password: 'tullrich'}; // this.userDetails durch loginData ersetzt

      this.servReqService.loginUser(loginData).subscribe((data: {}) => {
        //this.router.navigate(['/employees-list']);
        console.log(data);
        console.log('Save the Token of the User for further Requests');
        console.log('Go to Video-Site');
        //this.router.navigateByUrl('/videos');  
      });
    }

  goToRegister(){
    this.router.navigateByUrl('/register'); 
  }


  getUsers(){

  }
  getUser(id: number){

  }
  createUser(){

  }
  updateUser(id: number){

  }
  deleteUser(id: number){

  }

}
