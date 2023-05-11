import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MyService } from 'src/app/services/api.service';
import { Component, HostListener, ViewChild ,Renderer2, Output, EventEmitter, ElementRef,Input} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-vendor-mat-code-description',
  templateUrl: './vendor-mat-code-description.component.html',
  styleUrls: ['./vendor-mat-code-description.component.css']
})
export class VendorMatCodeDescriptionComponent {
 
     @Input() dataSource = new MatTableDataSource<any>();
     @Input() category: string="";
     displayedColumns: string[]=['VED_COD','VED_PRD_GRP_COD','VED_DESC'];
     //dataSource:MatTableDataSource<any>=new MatTableDataSource<any>();
     @ViewChild(MatTable) table!: MatTable<any>;
     @ViewChild(MatPaginator) paginator!: MatPaginator;
     @ViewChild(MatSort) sort!: MatSort;
     @ViewChild(MatSelect) select!: MatSelect;
     selectedRowData: any;
     ishidden=true;
     ishidden1=true;
     isTableOpen=false;
    //  @ViewChild('material') material:any=[];
    vendor : any;
     @Output() selectedRowVendor = new EventEmitter<any>();
     selectedRowIndex = -1;
     @Output() bookTitleCreated = new EventEmitter<any>();
   

    constructor( private service: MyService,private renderer: Renderer2,private elRef: ElementRef,private router:Router) {
    }

    ngAfterViewInit1() {
      debugger
      this.renderer.listen(this.vendor.nativeElement, 'keydown', (event) => {
        if (event.key === 'ArrowDown') {
          this.selectNextRow();
        }
      });
    }

    material_list:any;
    onKeyEnter(event: any) {
      debugger;
      console.log(event.target.value);
      this.material_list =this.vendor.filter( (res : any) =>{
        return res.materialCode.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase())
       })
      //  this.selectedRowDataCOD = event.materialCode;
      // this.selectedRowDataDESC = event.materialDesc;
      this.selectedRowVendor.emit()
      this.ishidden=true;
      
    }
    
    onRowClicked(rowData: any) {
      debugger
      // emit selected row data to parent component
      this.selectedRowVendor.emit(rowData);
      this.isTableOpen = false;
    }

    handleKeyDown(event: KeyboardEvent) {
      debugger
      if (event.keyCode === 38) { // up arrow key
        // select the previous row in the table
      } else if (event.keyCode === 40) { // down arrow key
        // select the next row in the table
      }
    }

    onclick(){
      debugger
      this.service.getVendorMaster().subscribe((data:any) => {
          this.vendor = data;
          
            this.vendor=this.vendor.filter((x: any) => x.VED_PRD_GRP_COD === this.category)
            this.dataSource=new MatTableDataSource<any>(this.vendor)
            this.dataSource.paginator=this.paginator
            this.dataSource.sort=this.sort
            this.isTableOpen = true;
            console.log(this.category);
          
          
     });
    }


    onKeydown(event:any) {
      if (event.key === "Enter") {
        console.log(event);
      }
    }

    
   

    ngOnInit(): any {
    //     this.service.getVendorMaster().subscribe((data:any) => {
    //         this.vendor = data;  
    //         this.dataSource=new MatTableDataSource<any>(this.vendor)
    //          this.dataSource.paginator=this.paginator
    //           this.dataSource.sort=this.sort
    //         this.ishidden=false
    // });
    }

    closeTable() {
      this.isTableOpen = false;
    }

    
    selectNextRow() {
      debugger
      if (this.selectedRowIndex < this.dataSource.data.length - 1) {
        //this.dataSource.data[this.selectedRowIndex].selected = false;
        this.selectedRowIndex++;
        this.dataSource.data[this.selectedRowIndex].selected = true;
      }
    }
    
    selectPreviousRow() {
      if (this.selectedRowIndex > 0) {
        this.dataSource.data[this.selectedRowIndex].selected = false;
        this.selectedRowIndex--;
        this.dataSource.data[this.selectedRowIndex].selected = true;
      }
    }
    

    onKeydown1(){
      debugger
          this.service.GetMaterialData().subscribe((data:any) => {
              this.vendor = data;  
              this.dataSource=new MatTableDataSource<any>(this.vendor)
               this.dataSource.paginator=this.paginator
                this.dataSource.sort=this.sort
              this.ishidden=false
      });
    }

   callvendor(){
    debugger
        this.service.getVendorMaster().subscribe((data:any) => {
            this.vendor = data;  
            this.dataSource=new MatTableDataSource<any>(this.vendor)
             this.dataSource.paginator=this.paginator
              this.dataSource.sort=this.sort
            this.ishidden=false
    });
   }
  // onKeyDown(){
  //   this.service.GetMatrial().subscribe((data:any) => {
  //             this.material = data;  
  //             this.dataSource=new MatTableDataSource<any>(this.material)
  //             this.dataSource.paginator=this.paginator
  //             this.dataSource.sort=this.sort
  //             this.ishidden=false
  //     });
  // }

  applyfilter(event:Event){
    debugger
    const filtervalue=(event.target as HTMLInputElement).value
    this.dataSource.filter=filtervalue.trim().toLowerCase();
    if(this.dataSource.paginator)
    {
      this.dataSource.paginator.firstPage();
    }
    

  }
  
}

