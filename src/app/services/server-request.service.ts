import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from '../shared/user';
import { Token } from '../shared/token';
import { Video } from '../shared/video';

@Injectable({
  providedIn: 'root'
})


export class ServerRequestService {


/**
 * Defines the URL were the APIs can be accessed
 */
APIurl = environment.baseUrl;


/**
 * Http-Client gets injected
 * @param https Http-Client
 */
constructor(private https: HttpClient) { }


/**
 * Defines the headers that are send with in each Http-Request
 */
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


/**
 * Logs in the User with the data from the Login-Form
 * @param user Interface 'User'
 * @returns User-Observable
 */
loginUser(user: User): Observable<User> {
  return this.https
    .post<User>(
      this.APIurl + '/login/', //1.Parameter: URL
      JSON.stringify(user), //2.Parameter: Body
      this.httpOptions //3.Parameter: If headers needed
    )
    .pipe(retry(1)); //Pipe if neccessary
}


/**
 * Registers the User with the data from the Register-Form
 * @param user Interface 'User'
 * @returns User-Observable
 */
registerUser(user: any): Observable<User> {
  return this.https
    .post<User>(
      this.APIurl + '/register/',
      JSON.stringify(user),
      this.httpOptions
    )
    .pipe(retry(1));
}


/**
 * Logs out the User with sending the token from the Local-Storage
 * @param token  Interface 'Token'
 * @returns Token-Observable
 */
logoutUser(token: any): Observable<Token> {
  return this.https
    .post<Token>(
      this.APIurl + '/logout/',
      JSON.stringify(token),
      this.httpOptions
    )
    .pipe(retry(1));
}


/**
 * Fetches the Videos for the Video-Page
 * @returns Video-Observable
 */
getVideos(): Observable<Video> {
  return this.https
    .get<Video>(this.APIurl + '/videos/')
    .pipe(retry(1));
}


/**
 * Changes the attributes of a Video with a certain id
 * @param video Interface 'Video'
 * @returns Video-Observable
 */
updateVideo(video: any): Observable<Video> {
  return this.https
    .put<Video>(
      this.APIurl + '/videos/' + video.id,
      JSON.stringify(video),
      this.httpOptions
    )
    .pipe(retry(1));
}
 
}
