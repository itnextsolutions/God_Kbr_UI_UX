import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TataService {
  constructor(private http: HttpClient) { }

  //apiEndpoint = 'https://localhost:44363/api/';

 //apiEndpoint = 'http://localhost:806/api/';

 //apiEndpoint = 'https://localhost:443/api/';

 //config = require('./config.json');

 //apiEndpoint = this.config.api.baseURL 
 apiEndpoint =localStorage.getItem('baseUrl')
 

 getBaseUrl(): Promise<string> {
  
  return this.http.get<any>('/config.json')
    .toPromise()
    .then((config: any) => config.baseUrl)
    .catch(() => {
      console.error('Error loading config.json');
      return '';
    });
}

retrieveBaseUrl() {
  
  this.http.get<any>('assets/config.json').subscribe(config => {
    const baseUrl = config.api.baseURL;
    localStorage.setItem('baseUrl', baseUrl)
    console.log('baseUrl =',baseUrl);
    // Use the base URL as needed
  });
}

async makeApiRequest(): Promise<any> {
  
  const baseUrl = await this.retrieveBaseUrl();
  //const url = `${baseUrl}/${endpoint}`;
  
  // Make your API request using the constructed URL
}



public login(val:any){
 this.makeApiRequest();
 var apiEndpoint =localStorage.getItem('baseUrl')
 console.log(apiEndpoint +'login/login')
 return this.http.post(apiEndpoint+ 'login/login', val);
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

public getStoreOutPalletDetailsSingleCheck(val : any){
  const params = { parameter: val}
  return this.http.get(this.apiEndpoint + 'StoreOut/GetPalletDetails_Single_Check',{params})
}

public getStoreOutPalletDetailsMultiCheck(val : any){
  const params = { parameter: val}
  return this.http.get(this.apiEndpoint + 'StoreOut/GetPalletDetails_Multi_Check',{params})
}

GetStockCountPartNo(){
  return this.http.get(this.apiEndpoint+'StockCount/GetStockCount')
}

GetPalletDetails(val1:any,val2:any){
  
  const params = { partno: val1,grno:val2}
  return this.http.get(this.apiEndpoint+'StockCount/GetPalletDetails',{params})
}

GetPalletDetails1(){
  return this.http.get(this.apiEndpoint+'StockCount/GetPalletDetails1')
}

UpdateInsert(data:any){
  

  return this.http.post(this.apiEndpoint+'StockCount/UpdateInsert',data)
}


updateEmptypallet(val:any){
  

  return this.http.post(this.apiEndpoint+'EmptyPallet/UpdateEmptyPallet',val)
}

GetStoreOutRequest(){
  return this.http.get(this.apiEndpoint +'StoreRequestCancellation/GetStoreOutRequestCancellation')
}

UpdateOrderItem(val:any){
  
  return this.http.post(this.apiEndpoint +'StoreRequestCancellation/UpdateOrderItem', val)
}

// Insert_StockMovt_Update_StockItm(val_1:any,val_2: any){
  
//   var data={
//     storeOutData: val_1,
//     orderData: val_2
//   }
//     return this.http.post(this.apiEndpoint + 'storeOut/Insert_StockMovt_Update_StockItm',data);

//  }

Insert_StockMovt_Update_StockItm(val:any){
  
  
    return this.http.post(this.apiEndpoint + 'storeOut/Insert_StockMovt_Update_StockItm',val);

 }

 GetStoreInRequest(){
  return this.http.get(this.apiEndpoint +'StoreRequestCancellation/GetStoreInRequestCancelletion')
 }

 UpdateHU_ID(val:any){
  return this.http.post(this.apiEndpoint +'RequestCancelletion/UpdateRequestCancelletion',val)
 }

 GetMenuList(val:any){

  const params = { userid: val}
  return this.http.get(this.apiEndpoint +'GetMenuList/GetMenu',{params})

 }
 
Insert_OrderItm(val : any){

  return this.http.post(this.apiEndpoint + 'storeOut/InsertOrderData',val)
}

GetDashBoardCount(){
  
  return this.http.get(this.apiEndpoint + 'Dashboard/GetDashboardCount')
 }

 GetPalletStatus(){
  return this.http.get(this.apiEndpoint + 'Dashboard/GetPalletStatus')
 }
 
 GetCraneStatus(){
  
  return this.http.get(this.apiEndpoint + 'Dashboard/GetCraneStatus')
 }


}