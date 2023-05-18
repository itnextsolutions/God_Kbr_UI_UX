import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TataService {
  constructor(private http: HttpClient) { }

  apiEndpoint = 'https://localhost:44363/api/';

public getemptypalletout(val:any){
  const params = { parameter: val}
  return this.http.get(this.apiEndpoint+'EmptyPalletOut/GetEmptyPalletOut',{params})
}

GetStockCountPartNo(){
  return this.http.get(this.apiEndpoint+'StockCount/GetStockCount')
}

GetPalletDetails(val1:any,val2:any){
  debugger
  const params = { partno: val1,grno:val2}
  return this.http.get(this.apiEndpoint+'StockCount/GetPalletDetails',{params})
}
}