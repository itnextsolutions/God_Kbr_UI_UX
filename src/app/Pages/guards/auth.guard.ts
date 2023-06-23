import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MyService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';
import { TataService } from 'src/app/services/TataCumminsapi.service';
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

  constructor(private auth : MyService, private router: Router, private toast:NgToastService,private tatacummins :TataService){

  }
  // canActivate(): boolean{
  //   // debugger
  //   if(this.auth.isLoggedin()){
  //     return true;
  //   }else{
  //     this.toast.warning({detail:"ERROR", summary:"Please Login!"});
  //     this.router.navigate(['login']);
  //     return false;
  //   }
    
  // }
   storedList: any=[];
  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
       let url: string = state.url;

           var storedListString = localStorage.getItem('menu');
           const storedList = storedListString ? JSON.parse(storedListString): [];
           return this.checkLogin(url,storedList);
       }

       checkLogin(url: string,storedList :[]): true | UrlTree {
          debugger
          console.log("Url: " + url)
          
          if(this.auth.isLoggedin())
          {
            if(url == '/Dashboard')
            {
               return true
            }
            else
            {
                let askurl=storedList.filter((x:any)=>x.OP_PAR4 == url)
                 if(askurl.length > 0)
                 {
                   return true;
                 }
                 else
                 {
                  this.toast.warning({detail:"ERROR", summary:"Sorry You Are Not Valid User!"});
                  return this.router.parseUrl('login')
                 }
             
            }
            
          }
          else
          {
            this.toast.warning({detail:"ERROR", summary:"Please Login!"});
            return this.router.parseUrl('login');
          }
       }
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //    const token = localStorage.getItem("jwt");
    //    if (token && !this.jwtHelper.isTokenExpired(token)){
    //      return true;
    //    }
    //    this.router.navigate(["/admin/login"]);
    //    return false;
    //  }
  
}