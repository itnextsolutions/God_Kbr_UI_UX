import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TataService {
  constructor(private http: HttpClient) { }

  apiEndpoint = 'https://localhost:44363/api/';

public getemptypalletout(val:any){
  return this.http.get(this.apiEndpoint+'EmptyPalletOut/GetEmptyPalletOut',val)
}

public insertEmptyPalletData(val:any){
  return this.http.post(this.apiEndpoint + 'EmptyPalletOut/InsertEmptyPalletData', val);
}

public getStoreOutData(){
  return this.http.get(this.apiEndpoint + 'StoreOut/GetStoreOutData');
}

public getStoreOutPalletDetails(){
  return this.http.get(this.apiEndpoint + 'StoreOut/GetPalletDetails')
}
}