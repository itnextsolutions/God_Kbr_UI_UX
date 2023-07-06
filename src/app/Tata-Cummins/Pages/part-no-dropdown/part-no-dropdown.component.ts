import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-part-no-dropdown',
  templateUrl: './part-no-dropdown.component.html',
  styleUrls: ['./part-no-dropdown.component.css']
})
export class PartNoDropdownComponent {

     displayedColumns: string[]=['STK_PRD_COD','STK_REC_NR','PRD_DESC'];
     
     selectedRowData: any;
     ishidden=true;
     ishidden1=true;
     isTableOpen=false;
     stockcountlist:any=[];

     
     @Input() dataSource = new MatTableDataSource<any>();
     @Output() selectedRow = new EventEmitter<any>();
     @ViewChild(MatPaginator) paginator!: MatPaginator;


    constructor( private tataservice: TataService) {
    }

    
    ngOnInit(): any {
     
    }

    closeTable() {
      this.isTableOpen = false;
      this.ishidden1=true;
    }
    
    GetStockCount(){
      return this.tataservice.GetStockCountPartNo().subscribe(resp =>{

        if(resp == null && resp == undefined)
        {
          Swal.fire({
            title:resp,
            icon:"error",
            showCancelButton: true,
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
            location.reload();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'You Can not Continue With Your Operation',
              )
            }
          })
        }
        else
        {
          this.stockcountlist=resp
          this.dataSource=new MatTableDataSource<any>( this.stockcountlist)
          this.dataSource.paginator=this.paginator
          this.isTableOpen=true
        }
      
          //this.ishidden1=false
      })

    }

    onRowClicked(rowData: any) {
      
      // emit selected row data to parent component
      this.selectedRow.emit(rowData);
      this.isTableOpen = false;
      this.ishidden1=true;
    }


    applyfilter(event:Event){
    
    const filtervalue=(event.target as HTMLInputElement).value
    this.dataSource.filter=filtervalue.trim().toLowerCase();
    if(this.dataSource.paginator)
    {
      this.dataSource.paginator.firstPage();
    }
    }

}

