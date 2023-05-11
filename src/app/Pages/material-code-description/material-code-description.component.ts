
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MyService } from 'src/app/services/api.service';
import { Component, HostListener, ViewChild ,Renderer2, Output, EventEmitter, ElementRef,Input} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSelect } from '@angular/material/select';



@Component({
  selector: 'app-material-code-description',
  templateUrl: './material-code-description.component.html',
  styleUrls: ['./material-code-description.component.css']
  
})



export class MaterialCodeDescriptionComponent {
 
     @Input() dataSource = new MatTableDataSource<any>();
     @Input() category: string="";
     displayedColumns: string[]=['PRD_COD','PRD_GRP_COD','PRD_DESC'];
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
    material : any;
     @Output() selectedRow = new EventEmitter<any>();
     selectedRowIndex = -1;
     @Output() bookTitleCreated = new EventEmitter<any>();
   

    constructor( private service: MyService,private renderer: Renderer2,private elRef: ElementRef,private router: Router) {
    }

    ngAfterViewInit1() {
      debugger
      this.renderer.listen(this.material.nativeElement, 'keydown', (event) => {
        if (event.key === 'ArrowDown') {
          this.selectNextRow();
        }
      });
    }

    material_list:any;
    onKeyEnter(event: any) {
      debugger;
      console.log(event.target.value);
      this.material_list =this.material.filter( (res : any) =>{
        return res.materialCode.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase())
       })
      //  this.selectedRowDataCOD = event.materialCode;
      // this.selectedRowDataDESC = event.materialDesc;
      this.selectedRow.emit()
      this.ishidden=true;
      
    }
    
    onRowClicked(rowData: any) {
      debugger
      // emit selected row data to parent component
      this.selectedRow.emit(rowData);
      this.isTableOpen = false;
      this.ishidden1=true;
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
      this.service.GetMaterialData().subscribe((data:any) => {
          this.material = data;
          
            this.material=this.material.filter((x: any) => x.PRD_GRP_COD === this.category)
            this.dataSource=new MatTableDataSource<any>(this.material)
            this.bookTitleCreated.emit({ title: this.material });
            this.dataSource.paginator=this.paginator
            this.dataSource.sort=this.sort
            this.isTableOpen = true;
            this.ishidden1=true;
            console.log(this.category);
          
          
  });
    }


    onKeydown(event:any) {
      if (event.key === "Enter") {
        console.log(event);
      }
    }
   

    ngOnInit(): any {
    //   debugger
    //     this.service.GetMaterialData().subscribe((data:any) => {
    //         this.material = data;  
    //         this.dataSource=new MatTableDataSource<any>(this.material)
    //          this.dataSource.paginator=this.paginator
    //           this.dataSource.sort=this.sort
    //           this.isTableOpen=true
    //           this.ishidden1=false
    // });
    }

    closeTable() {
      this.isTableOpen = false;
      this.ishidden1=true;
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
              this.material = data;  
              this.dataSource=new MatTableDataSource<any>(this.material)
               this.dataSource.paginator=this.paginator
                this.dataSource.sort=this.sort
              this.ishidden=false
      });
    }

   callmateial(){
    debugger
        this.service.GetMaterialData().subscribe((data:any) => {
            this.material = data;  
            this.dataSource=new MatTableDataSource<any>(this.material)
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
