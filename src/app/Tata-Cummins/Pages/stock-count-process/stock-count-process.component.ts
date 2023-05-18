import { Component ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import { PartNoDropdownComponent } from '../part-no-dropdown/part-no-dropdown.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stock-count-process',
  templateUrl: './stock-count-process.component.html',
  styleUrls: ['./stock-count-process.component.css']
})
export class StockCountProcessComponent {

  PartNo:string="";
  GrNo:string="";
  StockCountForm!:FormGroup;
  dataSource!:MatTableDataSource<any>;
  PalletdetailsList:any=[];

  @ViewChild(PartNoDropdownComponent) PartNoDrop!:PartNoDropdownComponent;

  constructor(private fb : FormBuilder ,private tataservice : TataService){}

  ngOnInit(){

    this.StockCountForm=this.fb.group({
    PartNo:["",Validators.required],
    GrNo:["",Validators.required]
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
      // if(this.PartNoDrop.dataSource.filteredData.length==0)
      // {
      //    this.PartNoDrop = 'No matching data found';
      // }
      // else {
      //   this.notFoundMessage = '';
      // }
   
    }

    GetStockCount(){
      this.PartNoDrop.GetStockCount()
    }

    GetPalletDetails(){
      debugger
      return this.tataservice.GetPalletDetails(this.PartNo,this.GrNo).subscribe(resp=>{
        this.PalletdetailsList=resp
      })
    }

    onContainerClick(){
      this.PartNoDrop.closeTable()
    }

    Selectedrow(out:any){

      this.PartNo=out.STK_PRD_COD
      this.GrNo=out.STK_REC_POS
    }

  }
  

