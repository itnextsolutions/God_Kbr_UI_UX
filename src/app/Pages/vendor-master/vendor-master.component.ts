import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.css']
})
export class VendorMasterComponent {

  dataSource!:MatTableDataSource<any>;
  @ViewChild('paginator') paginator! : MatPaginator; 
  displayedColumns = ['name','username'];
  @ViewChild(MatSort) matSort! : MatSort;

  ishidden=true;
  hide=true;
  disableTextBox =true;
   vendorForm!: FormGroup;
   materialCategory : string="";
   materialCode : any=[];
   materialDesc : string="";
   vendorCode : string="";
   vendorDesc : string="";

    vendor_list:any=[];

   isSubmitted=false;
   
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

      this.getVendorData();

    //   this.MyService.getUserData().subscribe((response:any) =>{
    //     this.dataSource = new MatTableDataSource(response);
    //     // console.log(this.dataSource);
    //      this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.matSort;
    // })
    
    }
  
    filterData($event : any){
      //this.dataSource.filter = $event.target.value;
    }
  
    getVendorData(){
      this.MyService.getVendorMaster().subscribe((resp:any)=>{
    // this.dataSource = new MatTableDataSource(resp);
      if(resp != undefined && resp !=null){

        this.vendor_list =resp;
        }
      })
    }
    
    addVendor() {
    
      if (this.vendorForm.valid) {
       // alert('valid form');
        var data ={
          material_category : this.materialCategory,
          material_code : this.materialCode.VED_PRD_COD,
          material_desc : this.materialDesc,
          vendor_code : this.vendorCode,
          vendor_desc : this.vendorDesc
        }
  
        this.MyService.vendorDataEntry(data).subscribe((resp) =>{

          if(resp == "Sucess"){
            this.sucessAlert();
            this.getVendorData();
          }
          else{
            this.errorAlert()
          }
        }) 

        this.resetForm();   
  
      } else {
        this.vendorForm.markAllAsTouched();      
      }
    }
  
    resetForm(){
      
      this.vendorForm.reset();
      this.ishidden=true;
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
    
    this.materialDesc =val.VED_PRD_DESC;

    // console.log(this.materialDesc);
  }


  onChange_Click(val:any){
    this.materialDesc = val.VED_PRD_DESC
  }

  onClick(e:any){
    
    // console.log(e.target.value);
    this.vendor_list.filter((x: { VED_PRD_GRP_COD: any; }) => x.VED_PRD_GRP_COD == e.target.value)
    // console.log(this.vendor_list);
  }

}
