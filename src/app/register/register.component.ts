import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerRequestService } from '../services/server-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() userDetails = { email: '', password: '', password2: '', token: '' };

  constructor(private router: Router, private servReqService: ServerRequestService) { }

  ngOnInit(): void {
  }

  registerUser(dataForUser: any){
    console.log('POST-Request to Backend with Register Data');
    console.log('E-Mail: ',this.userDetails.email);  
    console.log('Password: ',this.userDetails.password);
    console.log('Password2: ',this.userDetails.password2);
    console.log('Token: ',this.userDetails.token);
    console.log('WICHTIG: Wenn Länge von PW2 > 0, DANN ist es ein Registrierungsversuch');      


   if(this.userDetails.password == this.userDetails.password2){
    this.servReqService.createUser(this.userDetails).subscribe((data: {}) => {
      //this.router.navigate(['/employees-list']);
      console.log(data);
      console.log('Registration successful!');
      console.log('Go to Login-Site');
      //this.router.navigateByUrl('/login');  
    });
   } 
   else{
    console.log('Passwords are not equal!');
   }


  }

}
