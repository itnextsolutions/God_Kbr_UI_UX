import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyService } from 'src/app/services/api.service';
@Component({
  selector: 'app-vendor-master',
  templateUrl: './vendor-master.component.html',
  styleUrls: ['./vendor-master.component.css']
})
export class VendorMasterComponent {


  ishidden=true;
  hide=true;
  disableTextBox =true;
   vendorForm!: FormGroup;
   materialCategory : string="";
   materialCode : string="";
   materialDesc : string="";
   vendorCode : string="";
   vendorDesc : string="";

   vendor_list:any=[];
  
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
      vendorDesc :['',Validators.required]
      });
  
      this.MyService.getUserData().subscribe((response:any) =>{
         //this.dataSource = new MatTableDataSource(response);
         //this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.matSort;
    })

      this.MyService.getVendorMaster().subscribe(resp =>{
        this.vendor_list =resp;
        console.log(this.vendor_list);
      })

    }
  
    filterData($event : any){
      //this.dataSource.filter = $event.target.value;
    }
  
     add() {
     debugger;
      if (this.vendorForm.valid) {
       // alert('valid form');
        var data ={
          material_category : this.materialCategory,
          material_code : this.materialCode,
          material_desc : this.materialDesc,
          vendor_code : this.vendorCode,
          vendor_desc : this.vendorDesc
        }
  
      this.MyService.vendorDataEntry(data).subscribe((resp) =>{
        
       // console.log(resp);
          //alert("Sucess");
  
          this.vendorForm.reset();    
       
      })      
  
      } else {
        this.vendorForm.markAllAsTouched();      
      }
    }
  
    resetForm(){
      this.vendorForm.reset();
      this.ishidden=true;
    }
  
    hidden(){
      this.ishidden=false;
    }
  
   data(element:any){
    this.materialCode=element.username;
    this.materialDesc =element.name;
    // console.log(element);
    // console.log(this.materialDesc);
       this.ishidden=true;
    ;
   }

}
