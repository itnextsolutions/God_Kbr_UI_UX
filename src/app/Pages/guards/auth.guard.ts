import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MyService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
  
// }
export class AuthGuard implements CanActivate {
  constructor(private auth : MyService, private router: Router, private toast:NgToastService){

  }
  canActivate(): boolean{
    // debugger
    if(this.auth.isLoggedin()){
      return true;
    }else{
      this.toast.warning({detail:"ERROR", summary:"Please Login!"});
      this.router.navigate(['login']);
      return false;
    }
    
  }
  
}