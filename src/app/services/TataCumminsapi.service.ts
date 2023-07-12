import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TataService {
  constructor(private http: HttpClient) { }

  //apiEndpoint = 'https://localhost:44363/api/';

 //apiEndpoint = 'http://localhost:806/api/';

 apiEndpoint = 'https://localhost:443/api/';

 //config = require('./config.json');

 //apiEndpoint = this.config.api.baseURL 
//apiEndpoint =localStorage.getItem('baseUrl')
 retryDelay = 1000; // Delay in milliseconds between each retry
 maxRetries = 3;
 

 getBaseUrl(): Promise<string> {
  
  return this.http.get<any>('/config.json')
    .toPromise()
    .then((config: any) => config.baseUrl)
    .catch(() => {
      console.error('Error loading config.json');
      return '';
    });
}

retrieveBaseUrl(val:any,val1:string) {
  debugger
  this.http.get<any>('./assets/config.json').subscribe(config => {

    const baseUrl = config.api.baseURL;

    localStorage.setItem('baseUrl', baseUrl)

    console.log('baseUrl =',baseUrl);
    
    if(val1 == 'login')
    {
      return this.http.post(baseUrl + 'login/login', val);
    }
    else if(val1 == 'GetDashBoardCount')
    {
      //window.location.reload()
      return this.http.get(baseUrl + 'Dashboard/GetDashboardCount')
     
    }
    else if(val1 == 'GetPalletStatus')
    {
      return this.http.get(baseUrl + 'Dashboard/GetPalletStatus')
    }
    else (val1 == 'GetPalletStatus')
    {
      return this.http.get(baseUrl + 'Dashboard/GetCraneStatus')
    }
    
   
  });
}

makeApiRequest(val:any) {
  const baseUrl =  this.retrieveBaseUrl(val,val);
}

retrieveBaseUrlWithRetry(retryCount = 0) {
  if (retryCount >= this.maxRetries) {
    console.error('Maximum number of retries reached');
    // Handle error or show appropriate message
    return;
  }
}

retrivebaseurl(){
  debugger
  const retryCount = 1
  var apiEndpoint =localStorage.getItem('baseUrl')
  for(let retryCount = 0; apiEndpoint == null; retryCount++ )
  {
      //this.makeApiRequest();
      var apiEndpoint =localStorage.getItem('baseUrl');
      this.retrieveBaseUrlWithRetry(retryCount);
  }
  return apiEndpoint;
}

public login(val:any){
  debugger
 //this.retrieveBaseUrl(val,'login');
 //var apiEndpoint =localStorage.getItem('baseUrl')
 //console.log('apiend =' ,apiEndpoint +'login/login')
 //var apiEndpoint1=this.retrivebaseurl()

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
 // const params = { parameter: val}
  return this.http.post(this.apiEndpoint + 'StoreOut/GetPalletDetails',val)
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

method:string=''
param:string=''
GetDashBoardCount(){
  
  //this.method='GetDashBoardCount'
  //this.retrieveBaseUrl(this.param,this.method)
  return this.http.get(this.apiEndpoint + 'Dashboard/GetDashboardCount')
 
 }

 GetPalletStatus(){
  //this.method='GetPalletStatus'
  //this.retrieveBaseUrl(this.param,this.method)
  return this.http.get(this.apiEndpoint + 'Dashboard/GetPalletStatus')
 }
 
 GetCraneStatus(){
  //this.method='GetCraneStatus'
  //this.retrieveBaseUrl(this.param,this.method)
  return this.http.get(this.apiEndpoint + 'Dashboard/GetCraneStatus')
 }


}