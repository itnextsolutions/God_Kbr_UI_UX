import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import Swal from 'sweetalert2';
//import.swal
@Component({
  selector: 'app-empty-pallet-store-out-process',
  templateUrl: './empty-pallet-store-out-process.component.html',
  styleUrls: ['./empty-pallet-store-out-process.component.css']
})

export class EmptyPalletStoreOutProcessComponent {


  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;


  NoOfPalletStacks: number | undefined;
  EmptyPalletOutForm!: FormGroup;
  EmptyPalletList: any = [];
  Emptypalletout : any=[];
  isChecked: boolean = false;
  finalList: any=[];

  toggleCheckbox(): void {
    this.isChecked = !this.isChecked;
  }

  public pageName: string = "Empty Pallet Out Process";

msg:any;
  term='';
  pageSize: number = 1;
  itemsPerPage: number = 10;
  key: string = 'id';
  Store_out_requestFilterlist: any = [];
  reverse: boolean = false;
  //data: any[];
  //pageSize : number =1;
  //itemsPerPage : number=10;
  pageSizeOptions = [5, 10, 25, 50];
  isReadOnly: boolean = true;
  selectedItems: any = [];
  ser: any;
  Item: any = [];
  confirmList: any=[];
  EmptyPalletdata: any=[];
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse
    
  }
  
  filterData(val: any) {
    // this.storeIn =this.storeIn.filter((res : any)=>{return res.ORD_PRD_COD.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase()) ||
    //                                 res.VED_PRD_DESC.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase())})   

    this.EmptyPalletList = this.Emptypalletout.filter((res: any) => { return res.PALLET_NUMBER.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase()) })
  }
  constructor(private fb: FormBuilder, private tataservice: TataService) {

  }
  ngOnInit(): void {
      this.EmptyPalletOutForm = this.fb.group({
      NoOfPalletStacks: ['', Validators.required]
    })
  }

 //Use for Prevent (e,+,-) in input field
 handleKeyDown(event: any) {
  const forbiddenKeys = ['e', '+', '-', '.'];
  
  if (forbiddenKeys.includes(event.key)) {
    event.preventDefault();
  }
}

  OnSelect(val: any) {
   
    if (this.finalList.includes(val)) {
      this.finalList = this.finalList.filter((selected: any) => selected !== val);
    }
    else {
      this.isReadOnly = false;
      this.finalList.push(val);
    }
    console.log(this.finalList)
  }
  

  AddAlert() {
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Oops...',
      text: 'Select atleast one pallet',
      showConfirmButton: true,
      timer: 3000
    })
  }
  onAddClick() {
    
    this.confirmList=[];
    
    if(this.EmptyPalletOutForm.valid){
      this.tataservice.getemptypalletout(this.NoOfPalletStacks).subscribe(resp => {

               
        if(resp != null || resp != undefined)
        {
          this.EmptyPalletList = resp
          this.finalList = this.EmptyPalletList;
        }
        else
        {
          this.msg = 'No Data Found';
          this.errorAlert(this.msg);
        }
        
      });
    }
    else{
      this.EmptyPalletOutForm.markAllAsTouched();
    }
  }

  Reset() {

   this.EmptyPalletOutForm.reset();
   this.EmptyPalletList=[];
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
     this.update()
     } else if (result.dismiss === Swal.DismissReason.cancel) {
       Swal.fire(
         'You Can Continue With Your Operation',
       )
     }
   })
 }
  update() 
  {
    
     this.finalList.forEach((element:any) => {
      var val={
          HU_ID :element.HU_ID
      }
      this.confirmList.push(val);
    });
    
    this.tataservice.updateEmptypallet(this.confirmList).subscribe(resp => {
      
      if (resp == 1) {
        this.sucessAlert();
        // this.onAddClick();
        this.finalList=[];
        this.EmptyPalletOutForm.reset();
      
        // window.
        this.isReadOnly=true;
        this.selectedItems=[]; 
      }

      else {
        this.msg = 'Something went wrong!'
        this.errorAlert(this.msg);
      }
    });
    this.EmptyPalletList=[];
    
  } 
  
  sucessAlert() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Data has been updated',
      showConfirmButton: true,
      timer: 10000
    })
  }

  errorAlert(msg : any) {
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Oops...',
      text: msg,
      showConfirmButton: true,
      timer:3000
    })
  }
}
