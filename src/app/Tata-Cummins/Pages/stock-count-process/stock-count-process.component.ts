import { Component ,EventEmitter,Output,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import { PartNoDropdownComponent } from '../part-no-dropdown/part-no-dropdown.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-count-process',
  templateUrl: './stock-count-process.component.html',
  styleUrls: ['./stock-count-process.component.css']
})
export class StockCountProcessComponent {

   PartNo:string="";
   GrNo:string="";
   PalletID:string="";
   PartDesc:string="";
   PalletQTY:string="";
   AvailableQTY:string="";
   Remark:string="";
   message:string="";
   notFoundMessage:string="";

   StockCountForm!:FormGroup;
   dataSource!:MatTableDataSource<any>;
   PalletdetailsList:any=[];
   Confirmlist:any=[];
   edited=false;
   edited1=true

   @ViewChild(PartNoDropdownComponent) PartNoDrop!:PartNoDropdownComponent;
   @Output() UpdateRow = new EventEmitter<any>();
  secondList: any=[];
  

   constructor(private fb : FormBuilder ,private tataservice : TataService,private router :Router){}

    ngOnInit(){
     this.StockCountForm=this.fb.group({
     PartNo:["",Validators.required],
     GrNo:["",Validators.required],
     PalletID:["",Validators.required],
     PartDesc:["",Validators.required],
     PalletQTY:["",Validators.required],
     AvailableQTY:["",Validators.required],
     Remark:["",Validators.required]
     })

    }

    applyfilter(event:Event){
      debugger
      const filtervalue=(event.target as HTMLInputElement).value
      this.PartNoDrop.dataSource.filter=filtervalue.trim().toLowerCase();
      if(this.PartNoDrop.dataSource.paginator)
      {
        this.PartNoDrop.dataSource.paginator.firstPage();
      }
      if(this.PartNoDrop.dataSource.filteredData.length==0)
      {
         this.message = 'No matching data found';
      }
      else {
        this.notFoundMessage = '';
      }
   
    }

    Alert(){
       Swal.fire({
        title: 'Are you sure want to Continue',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Yes, Confirm!',
        cancelButtonText: 'Not, Confirm'
      }).then((result) => {
        if (result.value) {
        this.confirmButton()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'You Can not Continue With Your Operation',
          )
        }
      })
    }
    
    refreshData() {
      // Navigate to the same route with a different query parameter to clear the cache
      this.router.navigate(['stockCountProcess'], { queryParams: { timestamp: new Date().getTime() } });
    }

    newlist:any=[];
    confirmButton(){
      debugger
      
       this.tataservice.GetPalletDetails1().subscribe(resp=>{
        this.newlist=resp
        this.PalletdetailsList = this.newlist.filter((x: any) => x.STK_PRD_COD === localStorage.getItem("PartNo") && x.STK_REC_POS ===localStorage.getItem("GrNo"))
       })
       
       //window.location.reload();
    
      // this.tataservice.GetPalletDetails1().subscribe(resp=>{
      //   this.PalletdetailsList=resp

      //  this.tataservice.GetPalletDetails(localStorage.getItem("PartNo"),localStorage.getItem("GrNo")).subscribe(resp=>{
      // this.PalletdetailsList=resp
      // this.PalletdetailsList = this.PalletdetailsList.filter((x: any) => x.STK_PRD_COD === this.PartNo && x.STK_REC_POS ===this.GrNo)
      
      if(this.PalletdetailsList == null){

        this.Confirmlist.forEach((Element:any)=>{
          let val={
           HU_ID :Element.HU_ID,
           STK_PRD_COD :Element.STK_PRD_COD,
           STK_REC_POS :Element.STK_REC_POS,
           PRD_DESC :Element.PRD_DESC,
           STK_PRD_QTY :Element.STK_PRD_QTY,
           LOC_AISL_ID :Element.LOC_AISL_ID
   
         }
          this.secondList.push(val);
        })
        console.log(this.secondList);
        this.tataservice.UpdateInsert(this.secondList).subscribe(resp=>{
          Swal.fire({
          title: resp,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.value) {
          location.reload();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'You Can not Continue With Your Operation',
            )
          }
        })
      })
      }
      
    
         
    }

    GetStockCount(){
      this.PartNoDrop.GetStockCount()
    }

    GetPalletDetails(){
      debugger
      localStorage.setItem("PartNo",this.PartNo)
      
      localStorage.setItem("GrNo",this.GrNo)

      return this.tataservice.GetPalletDetails(this.PartNo,this.GrNo).subscribe(resp=>{
        this.PalletdetailsList=resp
        //this.Confirmlist=this.PalletdetailsList
        // this.PalletID=this.PalletdetailsList[0].HU_ID
        // this.PartDesc=this.PalletdetailsList[0].PRD_DESC
        // this.PalletQTY=this.PalletdetailsList[0].STK_PRD_QTY
        // this.AvailableQTY=this.PalletdetailsList[0].STK_AVA_QTY
      })
    }

    Reset(){
      debugger
      Swal.fire({
        title: 'Are you sure want to Reset',
        text: 'You will not be able to recover this operation',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Reset It!',
        cancelButtonText: 'Not, Reset'
      }).then((result) => {
        if (result.value) {
        
          this.StockCountForm.reset();
          this.PalletdetailsList =[];
          this.Confirmlist =[];
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'You Can Continue With Your Operation',
          )
        }
      })
    }
    

    onContainerClick(){
      this.PartNoDrop.closeTable()
    }

    Selectedrow(out:any){

      this.PartNo=out.STK_PRD_COD
      this.GrNo=out.STK_REC_POS
    }

    isCheked(data:any){
      debugger
      const index = this.Confirmlist.indexOf(data);


      if (this.Confirmlist.includes(data)) {
        this.Confirmlist.splice(index, 1);
      }
      else {
        this.Confirmlist.push(data);
      }
  
      console.log(this.Confirmlist);

    }
  
}
