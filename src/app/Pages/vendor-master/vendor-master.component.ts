import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MaterialCodeDescriptionComponent } from 'src/app/Pages/material-code-description/material-code-description.component';
@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.css']
})
export class VendorMasterComponent {
  public pageName: string = "Vendor Master";

  dataSource!:MatTableDataSource<any>;
  @ViewChild('paginator') paginator! : MatPaginator; 
  displayedColumns = ['name','username'];
  @ViewChild(MatSort) matSort! : MatSort;
  isFieldreadonly=true;
 
 //yogesh start
  
 @ViewChild(MaterialCodeDescriptionComponent) materialComponent!: MaterialCodeDescriptionComponent;



//  onKeyDown() {
//    debugger
//    const data =this.materialComponent.callmateial();
//    console.log(data);
//  }

 Onclick(){
   debugger
   const data =this.materialComponent.onclick();
   console.log(data);
 }

 filterTable(searchTerm: string) {
   this.materialComponent.dataSource.filter = searchTerm.trim().toLowerCase();
 
 }

 @ViewChild('material') material!: MaterialCodeDescriptionComponent;
 notFoundMessage:any;
 applyfilter(event:Event){
   debugger
   const filtervalue=(event.target as HTMLInputElement).value
   this.material.dataSource.filter=filtervalue.trim().toLowerCase();
   if(this.material.dataSource.paginator)
   {
     this.material.dataSource.paginator.firstPage();
   }
   if(this.material.dataSource.filteredData.length==0)
   {
   this.notFoundMessage = 'No matching data found';
   }
   else {
     this.notFoundMessage = '';
   }

 }
 
 onContainerClick(){
  debugger
  this.material.closeTable();
 }
 

 onCategoryClick(val:any){
  debugger
  this.materialCategory = val.GRP_COD;
  this.MyService.GetMaterialData().subscribe(resp =>{
    this.materialData_list = resp;
    this.materialData_list=this.materialData_list.filter((x: any) => x.PRD_GRP_COD === val.GRP_COD)
    this.isFieldreadonly=false
    //console.log(this.materialData_list);
    // this.material.dataSource=this.materialData_list
    // this.materialComponent.callmateial();
  })
}

 //end

  ishidden=true;
  hide=true;
  disableTextBox =true;
   vendorForm!: FormGroup;
   materialCategory : string="";
   materialCode : any=[];
   materialDesc : string="";
   vendorCode : string="";
   vendorDesc : string="";
   selectedRowDataCOD: any;
   selectedRowDataDESC: any;
   radioItems: any = [];
   materialData_list:any =[];
   vendor_list:any=[];
   isSubmitted=false;
   vendor_Filterlist: any=[];
   pageSize : number =1;
   itemsPerPage : number=10;
   pageSizeOptions = [5, 10, 25, 50];
   
   onPost= ()=>this.isSubmitted=true;

    constructor(
      private fb: FormBuilder,
      private MyService : MyService
      ) {}
  
    ngOnInit() {
      this.vendorForm = this.fb.group({
        materialCategory:['',Validators.required],
      materialCode: ['', [Validators.required]],         
      materialDesc : ['',Validators.required],
      vendorCode : ['',Validators.required],
      vendorDesc :['',Validators.required],
      

      });
      this.getMaterialData();
      this.getMaterialCategory();
      this.getVendorData();

    //   this.MyService.getUserData().subscribe((response:any) =>{
    //     this.dataSource = new MatTableDataSource(response);
    //     // console.log(this.dataSource);
    //      this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.matSort;
    // })
    this.getMaterialCategory();
    }
  
    onSelectedRow(selectedRowData: any) {
      debugger
      console.log (selectedRowData);
      this.selectedRowDataCOD = selectedRowData.PRD_COD;
      this.selectedRowDataDESC = selectedRowData.PRD_DESC;
      // do something with the selected row data
    }
    material_data:any;
    material_list:any;

    onKeyEnter(event: any) {
      debugger;
      console.log(event.target.value);
      this.material_list =event.material.filter( (res : any) =>{
        return res.materialCode.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase())
       })
       this.selectedRowDataCOD = event.materialCode;
      this.selectedRowDataDESC = event.materialDesc;
      this.ishidden=true;

      this.materialComponent.onKeyEnter;
      
    }

    onKeyDown(event: KeyboardEvent) {
      debugger
      switch (event.key) {
        case 'ArrowDown':
          this.material.selectNextRow();
          break;
        case 'ArrowUp':
          this.material.selectPreviousRow();
          break;
        default:
          break;
      }
    }

    getMaterialData(){

      this.MyService.GetMaterialData().subscribe(resp =>{

        this.materialData_list = resp;
        // this.materialData_list=this.materialData_list.filter((x: any) => x.PRD_GRP_COD === "SW")

        // console.log(this.materialData_list)
      })

    }


    
  getMaterialCategory(){
    debugger;
      this.MyService.GetMaterialCategory().subscribe(resp =>{
        if(resp != undefined && resp != null){
          this.radioItems = resp;
        }
        
    })
  }
  
  getVendorData(){
      this.MyService.getVendorMaster().subscribe((resp:any)=>{
    // this.dataSource = new MatTableDataSource(resp);
      if(resp != undefined && resp !=null){

        this.vendor_list =resp;
        this.vendor_Filterlist=this.vendor_list
        }
      })
    }
    
  addVendor() {
        debugger
      if (this.vendorForm.valid) {
       // alert('valid form');
        var data ={
          MSG_MATERIAL_CATEGORY : this.materialCategory,
          MSG_MATERIAL_CODE : this.selectedRowDataCOD,
          MSG_DESCRIPTION : this.selectedRowDataDESC,
          MSG_VENDOR_CODE : this.vendorCode,
          MSG_VENDOR_DESC : this.vendorDesc,
          MSG_TRANS_TYPE :"MASTER_V",
          MSG_PART_FLAG :"y"

        }
  
        this.MyService.insertHostToWms(data).subscribe((resp) =>{
          debugger

          console.log(resp);
          if(resp == "Success"){
            this.sucessAlert();
            this.getVendorData();
          }
          else{
            this.errorAlert()
          }
        }) 
        console.log("sUCCESS");
        this.resetForm();   
  
      } else {
        this.vendorForm.markAllAsTouched();      
      }
    }
  
    resetForm(){
     this.vendorForm.reset();
    // window.location.reload();
    }
    
    sucessAlert(){

      Swal.fire({  
        position: 'top',  
        icon: 'success',  
        title: 'Data has been saved',  
        showConfirmButton: true,  
         timer: 3000
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
  
    hidden(){
      this.ishidden=false;
    }
  
   data(element:any){
    debugger;
    this.materialCode=element.VED_PRD_COD;
    this.materialDesc =element.VED_PRD_DESC;
    this.ishidden=true;
    ;
   }

   onChange(val: any) {
    debugger;
    // this.materialCode=val.VED_PRD_COD;
    
    this.materialDesc =val.PRD_DESC;

    // console.log(this.materialDesc);
  }


  // onCategoryChange(val:any){
  //   debugger;
  //   console.log(val.GRP_COD);
  //    this.materialData_list=this.materialData_list.filter((x: any) => x.PRD_GRP_COD === val.GRP_COD)
  //    console.log(this.materialData_list)

  // }

  onCategoryChange(){
    debugger;
    console.log(this.materialCategory);
    //  this.materialData_list=this.materialData_list.filter((x: any) => x.PRD_GRP_COD === val.GRP_COD)
    //  console.log(this.materialData_list)

  }

  


  onChange_Click(val:any){
    this.materialDesc = val.VED_PRD_DESC
  }

  onClick(e:any){
    
    // console.log(e.target.value);
    this.vendor_list.filter((x: { VED_PRD_GRP_COD: any; }) => x.VED_PRD_GRP_COD == e.target.value)
    // console.log(this.vendor_list);
  }


  
  filterData(val : any){
    this.vendor_Filterlist =this.vendor_list.filter((res : any)=>{return res.VED_PRD_COD.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase()) ||
                                    res.VED_PRD_DESC.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase())})                               
    }
  
    key:string='id';
    reverse: boolean= false;
    sort(key: any){
      this.key=key;
      this.reverse =! this.reverse
    }
  

}
