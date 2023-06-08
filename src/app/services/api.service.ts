import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

@Injectable()
export class MyService {
  constructor(private http: HttpClient, private router: Router) { }

  apiEndpoint = 'https://localhost:44363/api/';

  

  public insertHostToWms(val :any){
    return this.http.post(this.apiEndpoint + 'HostToWms/InsertInToHostToWms',val);
  }

  getUserData() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getUsers(){
    return this.http.get(this.apiEndpoint + 'Users')
  }

  GetMaterialData() {
    return this.http.get(this.apiEndpoint + 'MaterialMaster/GetProduct');
  }
  
  GetMaterialCategory(){
    return this.http.get(this.apiEndpoint + 'MaterialMaster/GetMaterialCategory');
    }

    
  public getVendorMaster() {
    return this.http.get(this.apiEndpoint + 'vendor/GetVendorMaster');
  }


  public getMaterialType() {
    return this.http.get(this.apiEndpoint + 'MaterialMaster/GetMaterialType');
  }


  public getPalletType() {
    return this.http.get(this.apiEndpoint + 'MaterialMaster/GetPalletType');
  }



  public getMaterialStatus() {
    return this.http.get(this.apiEndpoint + 'MaterialMaster/GetMaterialStatus');
  }
 
  getStoreInOrderView(){
    return this.http.get(this.apiEndpoint + 'OrderINView/GetOrderdetail');
  }

  public UpdateStoreInOrderView(val :any, Hrs :any){

    const data = {
      wmsModels: val,
      hr: Hrs
    };
    return this.http.post(this.apiEndpoint + 'OrderInnView/UpdateInOrderInView',data);
  }

  public getOrderItems(){
    return this.http.get(this.apiEndpoint + 'Palletization/GetOrderItems');
  }

  public postOrderItems(val : any =[]){
    return this.http.post(this.apiEndpoint + 'HostToWms/InsertOrderitem',val);
  }

  public updateOrder(val : any){
    return this.http.post(this.apiEndpoint + 'Palletization/UpdateOrders',val);
  }

  //@VIP_05062023
  storageToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedin():boolean{
    return !!localStorage.getItem('token')
  }

  signOut(){
    // localStorage.clear();
    this.router.navigateByUrl('/login');
    location.reload();
  }
}