import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//import { Timestamp } from 'rxjs';//
import { MyService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-store-in-order-view',
  templateUrl: './store-in-order-view.component.html',
  styleUrls: ['./store-in-order-view.component.css']
})

export class StoreInOrderViewComponent {

  public pageName: string = "StoreIN Order View"

  public StoreInOrderView = new UntypedFormGroup({
  });

  TransID: string = " ";
  Material_code: string = " ";
  //Pallet_ID: string = "";
  //QTY: string = "";
  DOM: any;
  DOE: any;
  Status: string = " ";
  materialType: string = " ";
  storeIn: any = [];
  Hrs: number=0;
  pageSize: number = 1;
  itemsPerPage: number = 10;
  pageSizeOptions = [5, 10, 25, 50];
  StoreInView_Filterlist: any = [];
  Storeview_list: any = [];
  key: string = 'id';
  reverse: boolean = false;
  storeIn_list: any = [];
  selectedItems: any = [];

  isReadOnly: boolean = true;
  hrslist: any = [];
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse
  }

  filterData(val: any) {
    // this.storeIn =this.storeIn.filter((res : any)=>{return res.ORD_PRD_COD.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase()) ||
    //                                 res.VED_PRD_DESC.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase())})   

    this.Storeview_list = this.storeIn.filter((res: any) => { return res.ORD_PRD_COD.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase()) })
  }
  constructor(public fb: UntypedFormBuilder, private router: Router, private ser: MyService) {
  }
  form: FormGroup<{}> | undefined;

  ngOnInit(): void {
    this.StoreInOrderView = this.fb.group({
      Hrs: ['', [Validators.required]],
    });

    this.getStoreIndata();

  }


  onSelect(val: any) {
    debugger
    var data = {
      MSG_ORD_ID: val.ORD_ID
    }

    if (this.selectedItems.includes(val)) {
      this.selectedItems = this.selectedItems.filter((selected: any) => selected !== val);
    }
    else {
      this.isReadOnly = false;
      this.selectedItems.push(val);
    }

    if (this.selectedItems.length == 0) {
      this.isReadOnly = true;
    }
    console.log(this.selectedItems)
  }

  get formControl() {
    return this.StoreInOrderView.controls;
  }

  getStoreIndata() {
    this.ser.getStoreInOrderView().subscribe(resp => {
      this.storeIn = resp;
      // for (let item of this.storeIn) {
      //   const date = new Date(item.ORD_DT_REQUEST);
      //   const datePipe = new DatePipe('en-US');
      //    this.hrslist.push(datePipe.transform(date, 'h:mm'));
      // }

      // for (let item of this.hrslist) {
      //    this.storeIn.push(item);
      // }
      this.Storeview_list = this.storeIn
    })
  }
  //update method for hours 
  //UpdateStoreIndata(){
  //this.ser.updateStoreInOrderView().subscribe((resp:any)=> {
  //this.storeIn=resp;
  //console.log(this.storeIn)
  //} )
  //}


  /* onKeyDown(event: KeyboardEvent) {
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
  } */
  Reset() {
    this.getStoreIndata();
    this.StoreInOrderView.reset();
    this.selectedItems=null;
  }

  Edit() {

    if (this.StoreInOrderView.valid) {
      this.ser.UpdateStoreInOrderView(this.selectedItems, this.Hrs).subscribe(resp => {
        if (resp == "Success") {
          this.sucessAlert();
          this.getStoreIndata();
          this.Reset();
          this.isReadOnly = true;
          this.selectedItems=[];
        }
        else {
          this.errorAlert()
        }
      })
    }
    else {
      this.StoreInOrderView.markAllAsTouched();
    }
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

  errorAlert() {
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      showConfirmButton: true,
      timer: 3000
    })
  }
}
