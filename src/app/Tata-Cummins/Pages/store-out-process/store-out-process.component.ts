import { Component, ViewChild } from '@angular/core';
import { elementAt } from 'rxjs';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-out-process',
  templateUrl: './store-out-process.component.html',
  styleUrls: ['./store-out-process.component.css']
})
export class StoreOutProcessComponent {

  public pageName: string = "Store Out Process";
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
  checkList:any=[];
  orderData:any=[];



   constructor(private tataservice:TataService){}

   ngOnInit(){
       this.getStoreOutOrderData();
      //  this.getStoreOutPalletData();
   }

  
   getStoreOutOrderData(){
    debugger;
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
      let cal_qty =0;
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

          this.palletOutDetails[i].cal_qty = remain_qty;
          // this.palletOutDetails[i].STK_PRD_QTY = remain_qty;
          this.palletOutDetails[i].PARTIAL = partial_value;

          this.pallet.push(this.palletOutDetails[i]);
        }
        else
        {
          b = b + a;
          // c = remain_qty - a;
          // this.palletOutDetails[i].STK_PRD_QTY = a;
          this.palletOutDetails[i].cal_qty = a;
          partial_value =1;
          this.palletOutDetails[i].PARTIAL = partial_value;
          
          this.pallet.push(this.palletOutDetails[i]);
        }
  
        if(b == this.quantity){
          var data ={

            ORD_ID : this.order_id,
            RSV_QTY: this.quantity
          }

          this.orderData.push(data);

          return;
        }
        
      }
      
      })
      
    
  }

   onSelectOrderDetail(val:any){
    
    this.pallet=[];
    this.order_id = val.ORD_ID;
    if ( this.checkList.includes(val)) {
      this.checkList = this.checkList.filter((selected: any) => selected !== val);
    }
    else
    {
    this.checkList=[];
     this.checkList.push(val);
    }
    
   console.log(this.checkList);
   if(this.checkList.length > 0){
    // this.order_id = this.checkList[0].ORD_ID;
    this.quantity = this.checkList[0].ORD_REQ_QTY;
    this.product_code = this.checkList[0].ORD_PRD_COD;
   }

   else{
    this.quantity =0;
    this.product_code="";
   }
   
  }



  confirmationAlert(){
      Swal.fire({
      title: 'Are you sure want to Continue',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Not'
    }).then((result) => {
      if (result.value) {
      this.onConfirmClick();
      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'You Can not Continue With Your Operation',
        )
      }
    })
  }

  resetAlert(){
    
    Swal.fire({
      title: 'Are you sure want to Reset',
      text: 'You will not be able to recover this operation',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reset It',
      cancelButtonText: 'Not, Reset'
    }).then((result) => {
      if (result.value) {
      
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'You Can Continue With Your Operation',
        // )
      }
    })
  }

  onConfirmClick(){

    this.pallet.forEach((element:any) => {

      var data ={

        STK_PRD_COD : element.STK_PRD_COD,
        //  STK_RSV_QTY : element.STK_RSV_QTY,
         STK_RSV_QTY : element.cal_qty,
         STK_PRD_QTY : element.STK_PRD_QTY,
        HU_ID   : element.HU_ID,
        PARTIAL : element.PARTIAL
      }

      this.confirmList.push(data);
    });

      debugger
     this.tataservice.Insert_StockMovt_Update_StockItm(this.confirmList,this.orderData).subscribe(resp =>{

       if(resp == 'Success'){
        this.sucessAlert();
        //  window.location.reload();
       }
       else{
        this.errorAlert();
       }
       
    })
    debugger;
    
    this.pallet=[];
   
      
  }

  sucessAlert(){

    Swal.fire({  
      position: 'top',  
      icon: 'success',  
      title: 'Data has been saved',  
      showConfirmButton: true,  
       timer: 5000
    }).then((result) => {
      if (result.value) {
      //this.getStoreOutOrderData();
         window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'You Can Continue With Your Operation',
        // )
      }
    })
    
  }

  errorAlert(){  
   
    Swal.fire({  
      position: 'top', 
      icon: 'error',  
      title: 'Oops...',  
      text: 'Something went wrong!',  
      showConfirmButton: true,  
      timer: 3000 
    })  
  }
}
