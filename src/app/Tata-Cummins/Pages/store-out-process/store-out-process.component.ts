import { Component } from '@angular/core';
import { elementAt } from 'rxjs';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter'

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
   qty:number=0;
  pallet: any=[];
  outDetails: any=[];
  quantity : number=0;
  product_code:string="";
  order_details: any=[];
  term = ''; 
  confirmList: any=[];

   constructor(private tataservice:TataService){}

   ngOnInit(){
       this.getStoreOutOrderData();
      //  this.getStoreOutPalletData();
   }

   filterData(val : any){
    this.order_details =this.storeOutData.filter((res : any)=>{return res.ORD_PRD_COD.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase()) })                               
    }

   getStoreOutOrderData(){

      this.tataservice.getStoreOutData().subscribe(resp=>{
        this.storeOutData = resp;
        this.order_details = this.storeOutData;
      })
   }


  //  getStoreOutPalletData(){
  
  //   this.tataservice.getStoreOutPalletDetails(this.product_code).subscribe(resp =>{
  //     this.palletOutDetails = resp;
  //     this.outDetails = this.palletOutDetails;
  //     console.log(this.qty);
  //     console.log(this.palletOutDetails);
  //     console.log(this.pallet);
      
  //   })
  //  }

   onAddClick(){
    
      this.pallet=[];
      this.tataservice.getStoreOutPalletDetails(this.product_code).subscribe(resp =>{
      this.palletOutDetails = resp;
      // this.outDetails = this.palletOutDetails;
        
        debugger;
        
      let  a = this.quantity
      let b =0;
      let c =0;
      let partial_value = 0;
      let  PARTIAL;
      // for(let i=0; i < this.palletOutDetails.length; i++){
  
      //   if(this.palletOutDetails[i].STK_PRD_QTY <= a){
  
      //     b = b + this.palletOutDetails[i].STK_PRD_QTY;
      //     a = a- this.palletOutDetails[i].STK_PRD_QTY;

          
      //     this.palletOutDetails[i].PARTIAL = partial_value;

      //     this.pallet.push(this.palletOutDetails[i]);
      //   }
      //   else
      //   {
      //     b = b + a;
      //     c = this.palletOutDetails[i].STK_PRD_QTY - a;
      //     this.palletOutDetails[i].STK_PRD_QTY = a;
      //     partial_value =1;
      //     this.palletOutDetails[i].PARTIAL = partial_value;
          
      //     this.pallet.push(this.palletOutDetails[i]);
      //   }
  
      //   if(b == this.quantity){
      //     console.log(this.pallet);
      //     return;
      //   }
        
      // }



      for(let i=0; i < this.palletOutDetails.length; i++){
  
        let remain_qty = this.palletOutDetails[i].STK_PRD_QTY  - this.palletOutDetails[i].STK_RSV_QTY;
        if(remain_qty<= a){
  
          b = b + remain_qty;
          a = a- remain_qty;

          
          this.palletOutDetails[i].PARTIAL = partial_value;

          this.pallet.push(this.palletOutDetails[i]);
        }
        else
        {
          b = b + a;
          c = remain_qty - a;
          this.palletOutDetails[i].STK_PRD_QTY = a;
          partial_value =1;
          this.palletOutDetails[i].PARTIAL = partial_value;
          
          this.pallet.push(this.palletOutDetails[i]);
        }
  
        if(b == this.quantity){
          console.log(this.pallet);
          return;
        }
        
      }
      
      })
    
  }

   onSelectOrderDetail(val:any){
    this.pallet=[];
    this.order_id = val.ORD_ID;
    this.quantity = val.ORD_REQ_QTY;
    this.product_code = val.ORD_PRD_COD;
   }


   onConfirmClick(){

    debugger;
    this.pallet.forEach((element:any) => {

      var data ={

        STK_PRD_COD : element.STK_PRD_COD,
        STK_RSV_QTY : element.STK_RSV_QTY,
        STK_PRD_QTY : element.STK_PRD_QTY,
        HU_ID   : element.HU_ID,
        PARTIAL : element.PARTIAL
      }
       this.confirmList.push(data);
    });

    
     this.tataservice.Insert_StockMovt_Update_StockItm(this.confirmList).subscribe(resp =>{

       if(resp == 'Success'){
        alert("Data Has been Saved");
       }
       else{
        alert("Failed to Saved");
       }
       
    })
    this.pallet=[];
      
   }
}
