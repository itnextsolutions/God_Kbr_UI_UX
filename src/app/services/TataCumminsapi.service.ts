import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TataService {
  constructor(private http: HttpClient) { }

  apiEndpoint = 'https://localhost:44363/api/';


public login(val:any){

 return this.http.post(this.apiEndpoint + 'login/login', val);
}




public getemptypalletout(val:any){
  
  const params = { parameter: val}
  return this.http.get(this.apiEndpoint+'EmptyPalletOut/GetEmptyPalletOut',{params})
}

public insertEmptyPalletData(val:any){
  return this.http.post(this.apiEndpoint + 'EmptyPalletOut/InsertEmptyPalletData', val);
}

public getStoreOutData(){
  return this.http.get(this.apiEndpoint + 'StoreOut/GetStoreOutData');
}

public getStoreOutPalletDetails(val : any){
  const params = { parameter: val}
  return this.http.get(this.apiEndpoint + 'StoreOut/GetPalletDetails',{params})
}

GetStockCountPartNo(){
  return this.http.get(this.apiEndpoint+'StockCount/GetStockCount')
}

GetPalletDetails(val1:any,val2:any){
  debugger
  const params = { partno: val1,grno:val2}
  return this.http.get(this.apiEndpoint+'StockCount/GetPalletDetails',{params})
}

GetPalletDetails1(){
  return this.http.get(this.apiEndpoint+'StockCount/GetPalletDetails1')
}

UpdateInsert(data:any){
  debugger

  return this.http.post(this.apiEndpoint+'StockCount/UpdateInsert',data)
}


updateEmptypallet(val:any){
  debugger

  return this.http.post(this.apiEndpoint+'EmptyPallet/UpdateEmptyPallet',val)
}

GetStoreOutRequest(){
  return this.http.get(this.apiEndpoint +'StoreRequestCancellation/GetStoreOutRequestCancellation')
}

UpdateOrderItem(val:any){
  debugger
  return this.http.post(this.apiEndpoint +'StoreRequestCancellation/UpdateOrderItem', val)
}

Insert_StockMovt_Update_StockItm(val:any){
  
    return this.http.post(this.apiEndpoint + 'storeOut/Insert_StockMovt_Update_StockItm',val);

 }

public updateEmptypallet(val:any){
  debugger
  return this.http.post(this.apiEndpoint+'EmptyPallet/UpdateEmptyPallet',val)
  }
}