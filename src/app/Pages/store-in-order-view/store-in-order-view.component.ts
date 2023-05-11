import { Component } from '@angular/core';
import { FormGroup, UntypedFormBuilder, FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//import { Timestamp } from 'rxjs';//
import { MyService } from 'src/app/services/api.service';

@Component({
  selector: 'app-store-in-order-view',
  templateUrl: './store-in-order-view.component.html',
  styleUrls: ['./store-in-order-view.component.css']
})

export class StoreInOrderViewComponent {

  public pageName: string ="StoreIN Order View"

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
  Hrs:string ="";
  pageSize : number =1;
  itemsPerPage : number=10;
  pageSizeOptions = [5, 10, 25, 50];
  StoreInView_Filterlist: any=[];
  Storeview_list :any=[];

  key:string='id';
  reverse: boolean= false;
  storeIn_list: any=[];
  sort(key: any){
    this.key=key;
    this.reverse =! this.reverse
  }
 
  filterData(val : any){
    // this.storeIn =this.storeIn.filter((res : any)=>{return res.ORD_PRD_COD.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase()) ||
    //                                 res.VED_PRD_DESC.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase())})   
                                    
                                    this.Storeview_list =this.storeIn.filter((res : any)=>{return res.ORD_PRD_COD.toLocaleLowerCase().match(val.target.value.toLocaleLowerCase())}) 
    }
  constructor(public fb: UntypedFormBuilder, private router: Router, private ser: MyService) {
  }
  form: FormGroup<{}> | undefined;

  ngOnInit(): void {

    this.StoreInOrderView = this.fb.group({
      TransID: ['', [Validators.required]],
      materialCode: ['', [Validators.required]],
      //Pallet_ID: ['', [Validators.required]],
      //QTY: ['', [Validators.required]],
      DOM: ['', [Validators.required]],
      DOE: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      Materialtype: ['', [Validators.required]],
    });

    this.getStoreIndata();

  }
selectedItems :any=[];
onSelect(val:any){
  
  var  data ={

    MSG_ORD_ID : val.ORD_ID
  }
    if (this.selectedItems.includes(data)) {
        this.selectedItems = this.selectedItems.filter((selected : any)=> selected !== data);
    } else {
      this.selectedItems.push(data);
    }
    console.log(this.selectedItems);
  }
  
  get formControl() {
    return this.StoreInOrderView.controls;
   }
  getStoreIndata() {
      this.ser.getStoreInOrderView().subscribe(resp => {
      this.storeIn = resp;
      this.Storeview_list =this.storeIn
      console.log(this.storeIn);
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
    this.StoreInOrderView.reset();
  }

  Edit(){
  debugger
  console.log(this.Hrs);
    this.ser.UpdateStoreInOrderView(this.selectedItems,this.Hrs).subscribe(resp=>{
    
    console.log(resp);
    
    })
  }
}
