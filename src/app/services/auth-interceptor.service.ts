import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Klasse 'AuthInterceptorService' erbt vom Interface 'HttpInterceptor'
export class AuthInterceptorService implements HttpInterceptor {  


  constructor(private router: Router) {} 

 //1.Param: Request, 2.Param: Request wenn Response erfolgt , 3.Param: Response  
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    

  // Wir klonen unseren Request und hängen das Token an
   const token = localStorage.getItem('token'); //token aus dem LocalStorage holen

   if (token) {
     request = request.clone({
        setHeaders: {Authorization: `Token ${token}`}
     });
  }
  console.log('Token vom Interceptor angehängt: ',localStorage.getItem('token'));
  //Wir geben unseren Request in
  return next.handle(request).pipe(
  	catchError((err) => {
   	 if (err instanceof HttpErrorResponse) {
       	 if (err.status === 401) { //With Error 401 we are not authorized to access the ressource
         this.router.navigateByUrl('/login'); // Then redirect user to the login page
     	}
 	 }
  	return throwError(() => err);
	})
   )

  }
}