import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MyService } from '../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth : MyService, private router: Router, private toast:NgToastService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken(); 

    if(myToken){
      request = request.clone({
        setHeaders : {Authorization:`Bearer ${myToken}`} //"Bearer "+myToken
      })
    }
    
    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err.status === 401){
          this.toast.warning({detail:"Warning", summary:"Session has been expired, Login again!"});
          this.router.navigate(['login'])
          //location.reload();
        }
        return throwError(()=> new Error("Exception error occured!"))
      })
    );
  }
}
