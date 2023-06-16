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
  ord_quantity : number=0;
  product_code:any=[];
  order_details: any=[];
  term = ''; 
  pallet_search ='';
  confirmList: any=[];
  checkList:any=[];
  orderData:any=[];
  filter_pallet: any=[];
  palletOut: any=[];
  total_count =0;
  order_total_qty =0;
  filter_order: any=[];
  order_quantity: number=0;
  // b :number= 0;



   constructor(private tataservice:TataService){}

   ngOnInit(){
       this.getStoreOutOrderData();
      
   }

  
   getStoreOutOrderData(){
    
      this.tataservice.getStoreOutData().subscribe(resp=>{
        this.storeOutData = resp;
        this.order_details = this.storeOutData;
      })
   }


   

   onSelectOrderDetail_Single(val:any){
    
    this.pallet=[];
    this.orderData =[]; 
    // this.order_id = val.ORD_ID;
    if ( this.checkList.includes(val)) {
      this.checkList = this.checkList.filter((selected: any) => selected !== val);
    }
    else
    {
    // this.checkList=[];
     this.checkList.push(val);
    }
    
   console.log(this.checkList);
   if(this.checkList.length > 0){
     this.order_id = this.checkList[0].ORD_ID;
    this.ord_quantity = this.checkList[0].ORD_REQ_QTY;
    this.product_code = this.checkList[0].ORD_PRD_COD;
   }

   else{
    this.ord_quantity =0;
    this.product_code="";
   }
   
  }


  onSelectOrderDetail_Multi(val : any){

    
    this.pallet=[];
    this.orderData =[]; 
    this.total_count =0
    // this.order_id = val.ORD_ID;
    if ( this.checkList.includes(val)) {
      this.checkList = this.checkList.filter((selected: any) => selected !== val);
    }
    else
    {
    // this.checkList=[];
     this.checkList.push(val);
    }

    // console.log("Order_Selected",this.checkList);

    this.product_code = Array.from(new Set(this.checkList.map((x:any) => x.ORD_PRD_COD).sort()));    
    // console.log("Material",this.product_code);
  }


  onAddClick(){
    
    this.pallet=[];
    this.tataservice.getStoreOutPalletDetailsSingleCheck(this.product_code).subscribe(resp =>{
    
    if(resp != null || resp != undefined)
    {
      this.palletOutDetails = resp;
    // this.outDetails = this.palletOutDetails;
              
    let  a = this.ord_quantity
    let b =0;
    let c =0;
    let partial_value = 0;
    let  PARTIAL;
    let cal_qty =0;
    

    for(let i=0; i < this.palletOutDetails.length; i++){

      let pallet_qty = this.palletOutDetails[i].STK_PRD_QTY  - this.palletOutDetails[i].STK_RSV_QTY;
      if(pallet_qty<= a){

        b = b + pallet_qty;
        a = a- pallet_qty;

        this.palletOutDetails[i].cal_qty = pallet_qty;
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

      if(b == this.ord_quantity){
        var data ={

          ORD_ID : this.order_id,
          RSV_QTY: this.ord_quantity,
          // ORD_PARTIAL : 0
        }

        this.orderData.push(data);

        return;
        }
      
      }

    }
    else{
      this.errorAlert();
    }
    
    })
       
  }

  onAddClick_2(){
    
    this.pallet=[];
    this.orderData =[];
    
    this.tataservice.getStoreOutPalletDetailsMultiCheck(this.product_code).subscribe((resp:any) =>{
    if(resp != null || resp != undefined)
    {

        this.palletOutDetails = resp;
        this.palletOut =this.palletOutDetails
    // console.log("Pallet",this.palletOutDetails);
    
 
    for(let i =0; i < this.product_code.length; i++){
      this.total_count =0;
      this.order_total_qty =0;
       
        for(let k =0; k < this.checkList.length; k++){
          if(this.checkList[k].ORD_PRD_COD == this.product_code[i]){
            
            this.order_total_qty = this.checkList[k].ORD_REQ_QTY - this.checkList[k].ORD_RSV_QTY;
            this.total_count = this.total_count + this.order_total_qty;
          }
        }

      // console.log("Total_qty_out",this.total_count);

    let  a :any = this.total_count;
    let b :any  =0;
    let c =0;
    let partial_value = 0;
    let  PARTIAL;
    let cal_qty =0;
    this.filter_pallet= this.palletOut.filter((x:any)=>x.STK_PRD_COD == this.product_code[i])
    
    for(let j=0; j < this.filter_pallet.length; j++){

      
      let pallet_qty = this.filter_pallet[j].STK_PRD_QTY  - this.filter_pallet[j].STK_RSV_QTY;
      if(pallet_qty<= a){

        b = b + pallet_qty;
        a = a- pallet_qty;

        this.filter_pallet[j].cal_qty = pallet_qty;
        // this.palletOutDetails[i].STK_PRD_QTY = remain_qty;
        this.filter_pallet[j].PARTIAL = partial_value;
        this.pallet.push(this.filter_pallet[j]);
      
       }
      else if(pallet_qty > a)
      {
        b = b + a;
        // c = remain_qty - a;
        // this.palletOutDetails[i].STK_PRD_QTY = a;
        this.filter_pallet[j].cal_qty = a;
        partial_value =1;
        this.filter_pallet[j].PARTIAL = partial_value;
        
        this.pallet.push(this.filter_pallet[j]);      
      }

      // console.log(this.pallet);
  
       if(b == this.total_count){        
        break;
        }       
      
      }
        
      let  a_order :number = b;
      let b_order = 0;
      let cal_ord = 0;

       this.filter_order= this.checkList.filter((x:any)=>x.ORD_PRD_COD == this.product_code[i]);
      // console.log("Filter_order",this.filter_order);

      for(let l =0; l < this.filter_order.length; l++){

        this.order_quantity = this.filter_order[l].ORD_REQ_QTY - this.filter_order[l].ORD_RSV_QTY;
        if(this.order_quantity <= a_order){

          b_order = b_order + this.order_quantity;
          a_order = a_order - this.order_quantity;
          
          var data ={
  
                     ORD_ID : this.filter_order[l].ORD_ID,
                     ORD_PRD_COD:this.filter_order[l].ORD_PRD_COD,
                     ORD_REQ_QTY : this.filter_order[l].ORD_REQ_QTY - this.filter_order[l].ORD_RSV_QTY,
                     RSV_QTY: this.order_quantity,
                     ORD_PARTIAL : 0
                   }

                   this.orderData.push(data); 
        }
        else{

          if( b_order == b ){
            
            let final: number =this.filter_order[l].ORD_RSV_QTY;
            var data ={
  
              ORD_ID : this.filter_order[l].ORD_ID,
              ORD_PRD_COD:this.filter_order[l].ORD_PRD_COD,
              ORD_REQ_QTY : this.filter_order[l].ORD_REQ_QTY - this.filter_order[l].ORD_RSV_QTY,
              RSV_QTY: final,
              ORD_PARTIAL : 2
            }
            this.orderData.push(data);
          }
          else{
            b_order = b_order + a_order;
            var data ={
  
              ORD_ID : this.filter_order[l].ORD_ID,
              ORD_PRD_COD:this.filter_order[l].ORD_PRD_COD,
              ORD_REQ_QTY : this.filter_order[l].ORD_REQ_QTY - this.filter_order[l].ORD_RSV_QTY,
              RSV_QTY: a_order,
              ORD_PARTIAL : 1
            }
            this.orderData.push(data); 
          }
        }
      }

      // console.log("Order_status",this.orderData);
    
    }

    }
    else{
      this.errorAlert();
    }

    })
       
  }

  onConfirmClick(){

    this.pallet.forEach((element:any) => {

      var data ={
        STK_ID :element.STK_ID,
        STK_PRD_COD : element.STK_PRD_COD,
        // STK_RSV_QTY : element.STK_RSV_QTY,
        STK_RSV_QTY : element.cal_qty,
        STK_PRD_QTY : element.STK_PRD_QTY,
        HU_ID   : element.HU_ID,
        PARTIAL : element.PARTIAL
      }

      this.confirmList.push(data);
    });

      
     this.tataservice.Insert_StockMovt_Update_StockItm(this.confirmList,this.orderData).subscribe(resp =>{

       if(resp == 'Success'){
        this.sucessAlert();
        //  window.location.reload();
       }
       else{
        this.errorAlert();
       }
       
    })
    
    
    this.pallet=[];  
      
  }

  confirmationAlert(){
    Swal.fire({
    title: 'Are you sure want to Continue',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Not'
  }).then((result) => {
    if (result.value) {
    this.onConfirmClick();
    
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Swal.fire(
      //   'You Can not Continue With Your Operation',
      // )
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
