import { Component, ElementRef, ViewChild } from '@angular/core';
import { elementAt } from 'rxjs';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import Swal from 'sweetalert2';
import * as  XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-store-out-process',
  templateUrl: './store-out-process.component.html',
  styleUrls: ['./store-out-process.component.css']
})
export class StoreOutProcessComponent {
  public pageName: string = "Store Out Process";
 
  @ViewChild("fileUploadSimple", { static: false })
  InputVar!: ElementRef;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;
  
  

  
  orderPageSize : number =1;
   orderItemsPerPage : number=15;
   orderPageSizeOptions = [5, 10, 25, 50];


   pageSize : number =1;
   itemsPerPage : number=15;
   pageSizeOptions = [5, 10, 25, 50];
   isReadOnly: boolean = true;

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
  message :any;
  part_data :any=[]
  a : number=0;
  // b :number= 0;

   cal_qty : number = 0;
   ord_pos : string= '';
   id_ord : number = 0;
  another: any=[];

  public importedData: any = [];
  uploadList: any = [];
  final_pallet: any=[];

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse
    
  }
  


  
   constructor(private tataservice:TataService){}

   ngOnInit(){
       this.getStoreOutOrderData();
      
   }
  //  fileContent :any =[];

  //  private async getTextFromFile(event: any) {
  //   const file: File = event.target.files[0];
  //   let fileContent = await file.text();

  //   return fileContent;
  // }

  //  public async importDataFromCSV1(event: any) {
  //   debugger;
  //   this.fileContent = await this.getTextFromFile(event);
  //   // this.importedData = this.importDataFromCSV(fileContent);
  //   console.log(this.importedData)
  // }

  // fileUploadSimple_1(){
  //    this.importedData = this.importDataFromCSV(this.fileContent);
  //    console.log(this.importedData)
  // }

  //  public importDataFromCSV(csvText: string): Array<any> {
  //   debugger
  //   const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
  //   const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');

  //   let dataArray: any[] = [];
  //   dataRows.forEach((row) => {
  //     let values = row.split(',');

  //     let obj: any = new Object();

  //     for (let index = 0; index < propertyNames.length; index++) {
  //       const propertyName: string = propertyNames[index];

  //       let val: any = values[index];
  //       if (val === '') {
  //         val = null;
  //       }

  //       obj[propertyName] = val;
  //     }

  //     dataArray.push(obj);
  //   });

  //   return dataArray;
  // }
  ExcelData: any =[];

  ReadExcel(event : any){
    this.ExcelData =[];
    this.uploadList =[];
    
    
    if( event.target.files && event.target.files[0])
    {
      debugger;
       let file = event.target.files[0];
       
       if(file.type == "text/csv"){
       let fileReader = new FileReader();
       fileReader.readAsBinaryString(file);

       fileReader.onload = (e)=>{

           var workBook = XLSX.read(fileReader.result,{type:'binary'});
           var sheetNames = workBook.SheetNames;
           this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
           console.log(this.ExcelData);
           if(this.ExcelData.length < 1){
            // alert("File is empty");
            this.message = "File is Empty"
            this.errorAlert(this.message);
            this.InputVar.nativeElement.value = "";
           }
       } 
      }
    }
  }

  uploadFile(){

    this.ExcelData.forEach((element :any)=>{

      var data ={

        ORD_ID : element.ORD_ID,
        ORD_REC_POS : element.ORD_REC_POS,
        ORD_PRD_COD : element.ORD_PRD_COD,
        ORD_REQ_QTY : element.QTY,

      }

      this.uploadList.push(data);
  
     })
    this.tataservice.Insert_OrderItm(this.uploadList).subscribe(resp =>{

      if(resp == 1){
        this.sucessAlert();
        //  window.location.reload();
       }
       else{
        this.message = 'Something went wrong!';
         this.errorAlert(this.message);
       }

    })
  
  }

     
   getStoreOutOrderData(){
    
      this.tataservice.getStoreOutData().subscribe(resp=>{
        this.storeOutData = resp;
        this.order_details = this.storeOutData;
      })
   }


   

  //  onSelectOrderDetail_Single(val:any){
    
  //   this.pallet=[];
  //   this.orderData =[]; 
  //   // this.order_id = val.ORD_ID;
  //   if ( this.checkList.includes(val)) {
  //     this.checkList = this.checkList.filter((selected: any) => selected !== val);
  //   }
  //   else
  //   {
    
  //    this.checkList.push(val);
  //   }
    
  // //  console.log(this.checkList);
  //  if(this.checkList.length > 0){
  //    this.order_id = this.checkList[0].ORD_ID;
  //   this.ord_quantity = this.checkList[0].ORD_REQ_QTY;
  //   this.product_code = this.checkList[0].ORD_PRD_COD;
  //  }

  //  else{
  //   this.ord_quantity =0;
  //   this.product_code="";
  //  }
   
  // }


  onSelectOrderDetail_Multi(val : any){
    debugger;
    // this.checkList=[];
    //this.order_id = val.ORD_ID;
    this.pallet=[];
    this.orderData =[]; 
    
    this.total_count =0
    
    if ( this.checkList.includes(val)) {
      this.checkList = this.checkList.filter((selected: any) => selected !== val);
    }
    else
    {
    
     this.checkList.push(val);
    }

    // console.log("Order_Selected",this.checkList);

    this.product_code = Array.from(new Set(this.checkList.map((x:any) => x.ORD_PRD_COD).sort())); 
  }


  // onAddClick(){
    
  //   this.pallet=[];
  //   this.tataservice.getStoreOutPalletDetailsSingleCheck(this.product_code).subscribe(resp =>{
    
  //   if(resp != null || resp != undefined)
  //   {
  //     this.palletOutDetails = resp;
  //   // this.outDetails = this.palletOutDetails;
              
  //   let  a = this.ord_quantity
  //   let b =0;
  //   let c =0;
  //   let partial_value = 0;
  //   let  PARTIAL;
  //   let cal_qty =0;
    

  //   for(let i=0; i < this.palletOutDetails.length; i++){

  //     let pallet_qty = this.palletOutDetails[i].STK_PRD_QTY  - this.palletOutDetails[i].STK_RSV_QTY;
  //     if(pallet_qty<= a){

  //       b = b + pallet_qty;
  //       a = a- pallet_qty;

  //       this.palletOutDetails[i].cal_qty = pallet_qty;
  //       // this.palletOutDetails[i].STK_PRD_QTY = remain_qty;
  //       this.palletOutDetails[i].PARTIAL = partial_value;

  //       this.pallet.push(this.palletOutDetails[i]);
  //     }
  //     else
  //     {
  //       b = b + a;
  //       // c = remain_qty - a;
  //       // this.palletOutDetails[i].STK_PRD_QTY = a;
  //       this.palletOutDetails[i].cal_qty = a;
  //       partial_value =1;
  //       this.palletOutDetails[i].PARTIAL = partial_value;
        
  //       this.pallet.push(this.palletOutDetails[i]);
  //     }

  //     if(b == this.ord_quantity){
  //       var data ={

  //         ORD_ID : this.order_id,
  //         RSV_QTY: this.ord_quantity,
  //         // ORD_PARTIAL : 0
  //       }

  //       this.orderData.push(data);

  //       return;
  //       }
      
  //     }

  //   }
  //   else{
  //     // this.errorAlert();
  //   }
    
  //   })
       
  // }

  // onAddClick_2(){
    
  //   debugger;
  //   this.pallet=[];
  //   this.orderData =[];
  //   this.part_data =[];
  //   this.tataservice.getStoreOutPalletDetailsMultiCheck(this.product_code).subscribe((resp:any) =>{
  //   if(resp != null && resp != undefined && resp.length >0)
  //   {
  //       debugger;
  //       this.palletOutDetails = resp;
  //       this.palletOut =this.palletOutDetails
  //    console.log("Pallet",this.palletOutDetails);
    
 
  //   for(let i =0; i < this.product_code.length; i++){
  //     this.total_count =0;
  //     this.order_total_qty =0;
       
  //       for(let k =0; k < this.checkList.length; k++){
  //         if(this.checkList[k].ORD_PRD_COD == this.product_code[i]){
            
  //           this.order_total_qty = this.checkList[k].ORD_REQ_QTY - this.checkList[k].ORD_RSV_QTY;
  //           this.total_count = this.total_count + this.order_total_qty;
  //         }
  //       }

  //      console.log("Total_qty_out",this.total_count);

  //   let  a :any = this.total_count;
  //   let b :any  =0;
  //   let c =0;
  //   let partial_value = 0;
  //   let  PARTIAL;
  //   let cal_qty =0;
    
  //   this.filter_pallet= this.palletOut.filter((x:any)=>x.STK_PRD_COD == this.checkList[i])
  //   if(this.filter_pallet.length > 0){
  //     for(let j=0; j < this.filter_pallet.length; j++){

      
  //       let pallet_qty = this.filter_pallet[j].STK_PRD_QTY  - this.filter_pallet[j].STK_RSV_QTY;
  //       if(pallet_qty<= a){
  
  //         b = b + pallet_qty;
  //         a = a- pallet_qty;
  
  //         this.filter_pallet[j].cal_qty = pallet_qty;
  //         // this.palletOutDetails[i].STK_PRD_QTY = remain_qty;
  //         this.filter_pallet[j].PARTIAL = partial_value;
  //         this.pallet.push(this.filter_pallet[j]);
        
  //        }
  //       else if(pallet_qty > a)
  //       {
  //         b = b + a;
  //         // c = remain_qty - a;
  //         // this.palletOutDetails[i].STK_PRD_QTY = a;
  //         this.filter_pallet[j].cal_qty = a;
  //         partial_value =1;
  //         this.filter_pallet[j].PARTIAL = partial_value;
          
  //         this.pallet.push(this.filter_pallet[j]);      
  //       }
  
  //        console.log(this.pallet);
    
  //        if(b == this.total_count){        
  //         break;
  //         }       
        
  //       }
          
  //       let  a_order :number = b;
  //       let b_order = 0;
  //       let cal_ord = 0;
  
  //        this.filter_order= this.checkList.filter((x:any)=>x.ORD_PRD_COD == this.product_code[i]);
  //        console.log("Filter_order",this.filter_order);
  
  //       for(let l =0; l < this.filter_order.length; l++){
  
  //         this.order_quantity = this.filter_order[l].ORD_REQ_QTY - this.filter_order[l].ORD_RSV_QTY;
  //         if(this.order_quantity <= a_order){
  
  //           b_order = b_order + this.order_quantity;
  //           a_order = a_order - this.order_quantity;
            
  //           var data ={
    
  //                      ORD_ID : this.filter_order[l].ORD_ID,
  //                      ORD_PRD_COD:this.filter_order[l].ORD_PRD_COD,
  //                      ORD_REQ_QTY : this.filter_order[l].ORD_REQ_QTY - this.filter_order[l].ORD_RSV_QTY,
  //                      RSV_QTY: this.order_quantity,
  //                      ORD_PARTIAL : 0
  //                    }
  
  //                    this.orderData.push(data); 
  //         }
  //         else{
  
  //           if( b_order == b ){
              
  //             let final: number =this.filter_order[l].ORD_RSV_QTY;
  //             var data ={
    
  //               ORD_ID : this.filter_order[l].ORD_ID,
  //               ORD_PRD_COD:this.filter_order[l].ORD_PRD_COD,
  //               ORD_REQ_QTY : this.filter_order[l].ORD_REQ_QTY - this.filter_order[l].ORD_RSV_QTY,
  //               RSV_QTY: final,
  //               ORD_PARTIAL : 2
  //             }
  //             this.orderData.push(data);
  //           }
  //           else{
  //             b_order = b_order + a_order;
  //             var data ={
    
  //               ORD_ID : this.filter_order[l].ORD_ID,
  //               ORD_PRD_COD:this.filter_order[l].ORD_PRD_COD,
  //               ORD_REQ_QTY : this.filter_order[l].ORD_REQ_QTY - this.filter_order[l].ORD_RSV_QTY,
  //               RSV_QTY: a_order,
  //               ORD_PARTIAL : 1
  //             }
  //             this.orderData.push(data); 
  //           }
  //         }
  //       }
  
  //        console.log("Order_status",this.orderData);
      
  //     }
  //     else{
        
  //       this.part_data.push(this.product_code[i]);
                
  //     }


  //   }
    
  //   if(this.part_data.length > 0){

  //     this.message = "Quantity Not Available for Part  : " + this.part_data
  //     this.errorAlert(this.message);
  //   }
    

  //   }
  //   else{
  //     this.message ="Quantity Not Available for Part  : " + this.product_code; 
  //     this.errorAlert(this.message);
  //   }

  //   })
       
  // }



// onAddClick_3(){
    
//     debugger;
//     this.pallet=[];
//     this.orderData =[];
//     this.part_data =[];
//     this.tataservice.getStoreOutPalletDetailsMultiCheck(this.product_code).subscribe((resp:any) =>{
//     if(resp != null && resp != undefined && resp.length >0)
//     {
//         debugger;
//         this.palletOutDetails = resp;
//         this.palletOut =this.palletOutDetails
//      console.log("PalletOutDetails",this.palletOutDetails);


//      for(let i = 0;  i < this.palletOut.length; i++){
//       this.palletOut[i].cal_qty =0;
//       this.palletOut[i].ord_pos ='';
//       this.palletOut[i].id_ord =0;
//      }
    
 
//     for(let i =0; i < this.checkList.length; i++){
//       this.total_count =0;
//       this.order_total_qty =0;
      

//            this.order_total_qty = this.checkList[i].ORD_REQ_QTY - this.checkList[i].ORD_RSV_QTY;
//            this.total_count = this.total_count + this.order_total_qty;
//            console.log("Order_ID",this.checkList[i].ORD_ID);
//            console.log("Total_qty_out",this.total_count);
       
          
//     this.a = this.total_count;
//     let b :any  =0;
//     let c:any;
   
//     let partial_value = 0;
//     let  PARTIAL;
    
    
    
    
//     this.filter_pallet= this.palletOut.filter((x:any)=>x.STK_PRD_COD == this.checkList[i].ORD_PRD_COD)
//     if(this.filter_pallet.length > 0){
//       for(let j=0; j < this.filter_pallet.length; j++){
        
         
      
//         let pallet_qty = this.filter_pallet[j].STK_PRD_QTY  - this.filter_pallet[j].STK_RSV_QTY;
//         if(pallet_qty<= this.a){
  
//           b = b + pallet_qty;
//           this.a = this.a- pallet_qty;
  
//           this.filter_pallet[j].cal_qty = pallet_qty;
//           // this.palletOutDetails[i].STK_PRD_QTY = remain_qty;
//           this.filter_pallet[j].PARTIAL = partial_value;

//           this.filter_pallet[j].id_ord = this.checkList[i].ORD_ID; //ajit
//           this.filter_pallet[j].ord_pos = this.checkList[i].ORD_REC_POS;//ajit
          
//           this.pallet.push(this.filter_pallet[j]);

         
//           console.log("Pallet_If",this.pallet);//ajit 

          

          
//           // this.palletOut.shift(); 
          
//           const index = this.palletOut.indexOf(this.filter_pallet[j]);//ajit
//           this.palletOut.splice(index,1);//ajit

         
//           console.log("Pallet_Out_IF_Condition",this.palletOut);//ajit  
        
//          }
//         else if(pallet_qty > this.a)
//         {
//           b = b + this.a;
          
//           this.filter_pallet[j].cal_qty = this.a;
//           partial_value =1;
//           this.filter_pallet[j].PARTIAL = partial_value;

         
                   
//           this.filter_pallet[j].id_ord = this.checkList[i].ORD_ID; //ajit
//           this.filter_pallet[j].ord_pos = this.checkList[i].ORD_REC_POS;//aji

//           this.pallet.push(this.filter_pallet[j]);
 
          
//           this.palletOut[j] = {
//             STK_ID : this.filter_pallet[j].STK_ID,
//             STK_REC_POS : this.filter_pallet[j].STK_REC_POS,
//             HU_ID : this.filter_pallet[j].HU_ID,
//             STK_PRD_COD : this.filter_pallet[j].STK_PRD_COD,
//             STK_REC_NR : this.filter_pallet[j].STK_REC_NR,
//             STK_PRD_QTY:this.filter_pallet[j].STK_PRD_QTY,

//             STK_RSV_QTY : this.filter_pallet[j].STK_RSV_QTY + this.a,

//             HU_USAGE : this.filter_pallet[j].HU_USAGE,
//             LOC_AISL_ID : this.filter_pallet[j].LOC_AISL_ID,
//             LOC_X: this.filter_pallet[j].LOC_X,
//             LOC_Y:this.filter_pallet[j].LOC_Y,
//             LOC_Z:this.filter_pallet[j].LOC_Z,
//             LOC_P: this.filter_pallet[j].LOC_P

//           }
//           console.log("Pallet_ELSE",this.pallet);//ajit 
          
          
//            console.log("Pallet_Out_ELSE",this.palletOut);//ajit   
//           //  this.palletOut.pop();            
//         }

       
//         console.log("Pallet_Out_431",this.palletOut);//ajit 
//          console.log("Pallet_432",this.pallet);
    
//          if(b == this.total_count){  
                
//           break;
//           }       
        
//         }      
//       }
//       else{
        
//         this.part_data.push(this.checkList[i].ORD_PRD_COD);
                
//       }


//     }
    
//     if(this.part_data.length > 0){

//       this.message = "Quantity Not Available for Part  : " + this.part_data
//       this.errorAlert(this.message);
//     }
    

//     }
//     else{
//       this.message ="Quantity Not Available for Part  : " + this.product_code; 
//       this.errorAlert(this.message);
//     }

//     })
       
//   }





onAddClick_4(){
    
    
    this.pallet=[];
    this.orderData =[];
    this.part_data =[];
    this.tataservice.getStoreOutPalletDetailsMultiCheck(this.product_code).subscribe((resp:any) =>{
    if(resp != null && resp != undefined && resp.length >0)
    {
        
        this.palletOutDetails = resp;
        this.palletOut =this.palletOutDetails
     


        for(let i = 0;  i < this.palletOut.length; i++){
          this.palletOut[i].cal_qty =0;
          this.palletOut[i].ord_pos ='';
          this.palletOut[i].id_ord =0;
        }
    
 
        for(let i =0; i < this.checkList.length; i++){
          this.total_count =0;
          this.order_total_qty =0;
          

              this.order_total_qty = this.checkList[i].ORD_REQ_QTY - this.checkList[i].ORD_RSV_QTY;
              this.total_count = this.total_count + this.order_total_qty;
              console.log("Order_ID",this.checkList[i].ORD_ID);
              console.log("Total_qty_out",this.total_count);
          
              
              this.a = this.total_count;
              let b :any  =0;
              let c:any;
              
              let partial_value = 0;
              let  PARTIAL;
                
              this.palletOut.forEach((element:any) => {
      
                if(element.STK_PRD_QTY  == element.STK_RSV_QTY){
                  const index = this.palletOut.indexOf(element);//ajit
                      this.palletOut.splice(index,1);//ajit
                }
              })
        
        
          this.filter_pallet= this.palletOut.filter((x:any)=>x.STK_PRD_COD == this.checkList[i].ORD_PRD_COD)
          if(this.filter_pallet.length > 0){
            for(let j=0; j < this.palletOut.length; j++){
              
              if(this.palletOut[j].STK_PRD_COD == this.checkList[i].ORD_PRD_COD ){
            
                let pallet_qty = this.palletOut[j].STK_PRD_QTY  - this.palletOut[j].STK_RSV_QTY;
                if(pallet_qty > 0){

                if(pallet_qty<= this.a){
          
                  b = b + pallet_qty;
                  this.a = this.a- pallet_qty;
          
                  this.palletOut[j].cal_qty = pallet_qty;
                  
                  this.palletOut[j].id_ord = this.checkList[i].ORD_ID; //ajit
                  this.palletOut[j].ord_pos = this.checkList[i].ORD_REC_POS;//ajit
                  
                  this.pallet.push(this.palletOut[j]);
                  

                  this.palletOut[j] = {
                    STK_ID : this.palletOut[j].STK_ID,
                    STK_REC_POS : this.palletOut[j].STK_REC_POS,
                    HU_ID : this.palletOut[j].HU_ID,
                    STK_PRD_COD : this.palletOut[j].STK_PRD_COD,
                    STK_REC_NR : this.palletOut[j].STK_REC_NR,
                    STK_PRD_QTY:this.palletOut[j].STK_PRD_QTY,
                    PRD_DESC : this.palletOut[j].PRD_DESC,
        
                    STK_RSV_QTY : this.palletOut[j].STK_RSV_QTY + pallet_qty,
        
                    HU_USAGE : this.palletOut[j].HU_USAGE,
                    LOC_AISL_ID : this.palletOut[j].LOC_AISL_ID,
                    LOC_X: this.palletOut[j].LOC_X,
                    LOC_Y:this.palletOut[j].LOC_Y,
                    LOC_Z:this.palletOut[j].LOC_Z,
                    LOC_P: this.palletOut[j].LOC_P
        
                  }
                }
                else if(pallet_qty > this.a)
                {
                  b = b + this.a;
                  
                  this.palletOut[j].cal_qty = this.a;
                  this.palletOut[j].id_ord = this.checkList[i].ORD_ID; //ajit
                  this.palletOut[j].ord_pos = this.checkList[i].ORD_REC_POS;//aji
                
                  
                  this.pallet.push(this.palletOut[j]);

                  this.palletOut[j] = {
                    STK_ID : this.palletOut[j].STK_ID,
                    STK_REC_POS : this.palletOut[j].STK_REC_POS,
                    HU_ID : this.palletOut[j].HU_ID,
                    STK_PRD_COD : this.palletOut[j].STK_PRD_COD,
                    STK_REC_NR : this.palletOut[j].STK_REC_NR,
                    STK_PRD_QTY:this.palletOut[j].STK_PRD_QTY,
                    PRD_DESC : this.palletOut[j].PRD_DESC,
                    STK_RSV_QTY : this.palletOut[j].STK_RSV_QTY + this.a,
        
                    HU_USAGE : this.palletOut[j].HU_USAGE,
                    LOC_AISL_ID : this.palletOut[j].LOC_AISL_ID,
                    LOC_X: this.palletOut[j].LOC_X,
                    LOC_Y:this.palletOut[j].LOC_Y,
                    LOC_Z:this.palletOut[j].LOC_Z,
                    LOC_P: this.palletOut[j].LOC_P
        
                  }
                                        
                }
          
                if(b == this.total_count){  
                        
                  break;
                } 
              }
              }
              
            } 
                        
          }
          else{      
            // this.part_data.push(this.checkList[i].ORD_PRD_COD);
            this.part_data.push(this.checkList[i].ORD_ID);               
          }
              
        }
    
        if(this.part_data.length > 0){

          this.message = "Quantity Not Available for Order Id  : " + this.part_data
          this.errorAlert(this.message);
        }
        
        }
        else{
          this.message ="Quantity Not Available for Part  : " + this.product_code; 
          this.errorAlert(this.message);
        }

    })
      
  }


  onConfirmClick(){
    
    this.confirmList =[];
    this.pallet.forEach((element:any) => {

      var data ={

        ORD_ID : element.id_ord,
        ORD_REC_POS : String(element.ord_pos),
        STK_ID :element.STK_ID,
        STK_PRD_COD : element.STK_PRD_COD,
        PRD_DESC : element.PRD_DESC,
        STK_RSV_QTY : element.cal_qty,
        STK_PRD_QTY : element.STK_PRD_QTY,
        HU_ID   : element.HU_ID,
        // PARTIAL : element.PARTIAL
        
      }

      this.confirmList.push(data);
    });

      
    //  this.tataservice.Insert_StockMovt_Update_StockItm(this.confirmList,this.orderData).subscribe(resp =>{

    //    if(resp == 'Success'){
    //     this.sucessAlert();
    //     //  window.location.reload();
    //    }
    //    else{
    //     this.message = 'Something went wrong!';
    //      this.errorAlert(this.message);
    //    }
       
    // })
    
    this.tataservice.Insert_StockMovt_Update_StockItm(this.confirmList).subscribe(resp =>{

      if(resp != null && resp != undefined){
          if(resp == 1){
          this.sucessAlert();
          //  window.location.reload();
          }
          else{
          this.message = 'Something went wrong!';
            this.errorAlert(this.message);
          }
      }
      else{
            this.message = 'Something went wrong!';
            this.errorAlert(this.message);
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

  errorAlert(msg :any){  
   
    Swal.fire({  
      position: 'top', 
      icon: 'error',  
      title: 'Oops...',  
      text: msg,  
      showConfirmButton: true,  
      timer: 5000 
    })  
  }
}
