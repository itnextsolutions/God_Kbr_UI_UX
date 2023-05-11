import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class MyService {
  constructor(private http: HttpClient) { }

  apiEndpoint = 'https://localhost:44363/api/';

  

  public insertHostToWms(val :any){
    return this.http.post(this.apiEndpoint + 'HostToWms/InsertInToHostToWms',val);
  }

  getUserData() {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
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

  public UpdateStoreInOrderView(val :any, Hrs :string){

    const data = {
      wmsModels: val,
      hr: Hrs
    };
    return this.http.post(this.apiEndpoint + 'OrderInnView/UpdateInOrderInView',data);
  }

}