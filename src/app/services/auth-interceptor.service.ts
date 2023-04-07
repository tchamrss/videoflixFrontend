import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


/**
 * Class 'AuthInterceptorService' inherits from 'HttpInterceptor'
 */
export class AuthInterceptorService implements HttpInterceptor {  

  
/**
 * Router gets injected
 * @param router Router-Service
 */
constructor(private router: Router) {} 


 /**
  * Each Http-Request gets attached with a token, before it is send to the Backend 
  * @param request Http-Request
  * @param next Http-Request-Handler which handles the response from the Backend
  * @returns Http-Event which is the response from the Backend
  */
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {     
   //If token is available the request gets cloned and the token fetched from Local-Storage is attached
   const token = localStorage.getItem('token');
   if (token) {
     request = request.clone({
        setHeaders: {Authorization: `Token ${token}`}
     });
  }
  //If the Handler gets an '401'-Error as Reponse from the Backend, then it redirects the User to Login-Page
  return next.handle(request).pipe(
  	catchError((err) => {
   	 if (err instanceof HttpErrorResponse) {
       	 if (err.status === 401) { //Error 401: User is not authorized to access the ressource
         this.router.navigateByUrl('/login'); //User gets redirected to the login page
     	}
 	 }
  	return throwError(() => err);
	})
   )
  }

}