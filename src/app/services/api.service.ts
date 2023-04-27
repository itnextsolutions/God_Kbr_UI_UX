import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class MyService {
  constructor(private http: HttpClient) { }

  apiEndpoint = 'https://localhost:44363/api/';

  insertMaterial(val: any) {
    debugger
    return this.http.post(this.apiEndpoint + 'MaterialMaster/InsertMaterial', val);
  }

 updateMaterial(val: any) {
    debugger
    return this.http.post(this.apiEndpoint + 'MaterialMaster/UpdateMaterial', val);
  }

  public vendorDataEntry(data: any) {
    return this.http.post(this.apiEndpoint + 'vendor/InsertVendorMaster', data);
  }

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

}