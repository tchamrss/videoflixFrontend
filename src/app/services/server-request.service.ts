import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { lastValueFrom, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user';
import { Token } from '../shared/token';
import { Video } from '../shared/video';

@Injectable({
  providedIn: 'root'
})
export class ServerRequestService {

//Define API
APIurl = environment.baseUrl;

constructor(private https: HttpClient) { }


// HttpClient Login User
loginUser(user: any): Observable<User> {
  return this.https
    .post<User>(
      this.APIurl + '/login/', //1.Param: URL
      JSON.stringify(user) //2.Param: Body
      //this.httpOptions //3.Param: If headers needed
    )
    .pipe(retry(1), catchError(this.handleError));
}


// HttpClient Register User
registerUser(user: any): Observable<User> {
  return this.https
    .post<User>(
      this.APIurl + '/register/',
      JSON.stringify(user)
      //this.httpOptions
    )
    .pipe(retry(1), catchError(this.handleError));
}

// HttpClient Logout User
logoutUser(token: any): Observable<Token> {
  return this.https
    .post<Token>(
      this.APIurl + '/logout/',
      JSON.stringify(token)
      //this.httpOptions
    )
    .pipe(retry(1), catchError(this.handleError));
}

// HttpClient Show Videos
getVideos(): Observable<Video> {
  return this.https
    .get<Video>(this.APIurl + '/videos/')
    .pipe(retry(1), catchError(this.handleError));
}

// HttpClient API put() method => Update User
updateVideo(video: any): Observable<Video> {
  return this.https
    .put<Video>(
      this.APIurl + '/videos/' + video.id,
      JSON.stringify(video)
      //this.httpOptions
    )
    .pipe(retry(1), catchError(this.handleError));
}

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
 
}
