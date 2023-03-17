import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Injectable } from  '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../shared/user';
import { Video } from '../shared/video';



@Injectable({
  providedIn: 'root'
})
export class ServerRequestService {

//Define API
APIurl = 'https://tullrich.pythonanywhere.com';

constructor(private https: HttpClient) { }

/*========================================
  CRUD Methods for consuming RESTful API
=========================================*/

// Http Options
httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


// HttpClient API post() method => Login User
loginUser(user: any): Observable<User> {
  return this.https
    .post<User>(
      this.APIurl + '/login',
      JSON.stringify(user),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.handleError));
}


// HttpClient API post() method => Create User
createUser(user: any): Observable<User> {
  return this.https
    .post<User>(
      this.APIurl + '/register',
      JSON.stringify(user),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.handleError));
}

// HttpClient API post() method => Logout User
logoutUser(user: any): Observable<User> {
  return this.https
    .post<User>(
      this.APIurl + '/users',
      JSON.stringify(user),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.handleError));
}

// HttpClient API get() method => Fetch Videos
getVideos(user: any): Observable<Video> {
  return this.https
    .get<Video>(this.APIurl + '/videos')
    .pipe(retry(1), catchError(this.handleError));
}

/*========================================
  NOT USED
=========================================*/

// HttpClient API get() method => Fetch Users
getUsers(): Observable<User> {
  return this.https
    .get<User>(this.APIurl + '/users')
    .pipe(retry(1), catchError(this.handleError));
}

// HttpClient API get() method => Fetch User
getUser(id: any): Observable<User> {
  return this.https
    .get<User>(this.APIurl + '/users/' + id)
    .pipe(retry(1), catchError(this.handleError));
}

// HttpClient API put() method => Update User
updateUser(id: any, user: any): Observable<User> {
  return this.https
    .put<User>(
      this.APIurl + '/users/' + id,
      JSON.stringify(user),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.handleError));
}

// HttpClient API delete() method => Delete User
deleteUser(id: any) {
  return this.https
    .delete<User>(this.APIurl + '/users/' + id, this.httpOptions)
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
