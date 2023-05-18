import { Component } from '@angular/core';
import { TataService } from 'src/app/services/TataCumminsapi.service';

@Component({
  selector: 'app-store-out-process',
  templateUrl: './store-out-process.component.html',
  styleUrls: ['./store-out-process.component.css']
})
export class StoreOutProcessComponent {

  pageSize : number =1;
   itemsPerPage : number=10;
   pageSizeOptions = [5, 10, 25, 50];
   storeOutData:any=[];
   order_id : number=0;
   palletOutDetails :any=[];
   qty:number=2433;

   constructor(private tataservice:TataService){}

   ngOnInit(){
       this.getStoreOutOrderData();
       this.getStoreOutPalletData();
   }

   getStoreOutOrderData(){

      this.tataservice.getStoreOutData().subscribe(resp=>{
        this.storeOutData = resp;
      })
   }


   getStoreOutPalletData(){
    this.tataservice.getStoreOutPalletDetails().subscribe(resp =>{
      this.palletOutDetails = resp;
      console.log(this.qty);
      console.log(this.palletOutDetails);



    })
   }

   onSelectOrderDetail(val:any){
    this.order_id = val.ORD_ID;
   }
}
