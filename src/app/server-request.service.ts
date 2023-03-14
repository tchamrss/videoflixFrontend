import { Injectable } from '@angular/core';
import { Token } from './token/token';


@Injectable({
  providedIn: 'root'
})
export class ServerRequestService {

private email:string = '';
private password: string = ''; 
private token: string = '';


  constructor() {}

  constructFormDataAndHeader(){
    let formData = new FormData();
    let header = new Headers();
    header.append('Authorization', `Token ${this.token}`);
    formData.append('email', this.email);
    formData.append('password', this.password)
    return {formData,header};
  }
  

  async tryLoginUser(email:string,password:string){
    this.email=email;
    this.password=password;
    this.token=Token.savedToken;
    console.log('1. Service trys to logg us in with the following data:');
    console.log('1. E-Mail: ',this.email);
    console.log('1. Password: ',this.password);
    console.log('1. Token: ',this.token);
    let dataForServerRequest = this.constructFormDataAndHeader();
    let fd = dataForServerRequest.formData
    let hds = dataForServerRequest.header
    //let response = await fetch(`${url}`, {method: 'POST', body: fd, headers: hds});

  }
  
  tryRegisterUser(){
    console.log('Service versucht uns nun zu registrieren');
  }
  
  tryToFetchVideos(){

  }

  tryToLogout(){

  }


}
