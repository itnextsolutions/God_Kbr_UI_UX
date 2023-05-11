import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyService } from 'src/app/services/api.service';

@Component({
  selector: 'app-palletization-process',
  templateUrl: './palletization-process.component.html',
  styleUrls: ['./palletization-process.component.css']
})
export class PalletizationProcessComponent {
  public pageName: string = "Palletization Process";
  orderData: any=[];

  ORD_REF_POS : string ="";
  ORD_REQ_QTY :string ="";
  palletNumber :string ="";
  barcode :string="";
  order_id : number=0;
  selectedItems :any=[];
  order_item:any;
  order_return : any=[];

   palletizationForm !: FormGroup;

  constructor(private router: Router, private service: MyService,
    private fb: FormBuilder,){

  }

  ngOnInit():void{

    this.palletizationForm = this.fb.group({
      palletNumber:['',Validators.required],
      barcode: ['', Validators.required],         
      ORD_REF_POS : ['',Validators.required],
      ORD_REQ_QTY : ['',Validators.required],
    

    });

    this.getOrderItems();

  }


  //Get All Orders
  getOrderItems(){

    this.service.getOrderItems().subscribe( (resp:any) => {

      this.orderData = resp;      
    })

  }


  //Select Order from Order Details  Grid
  onSelect(val : any){
   
    this.order_id = val.ORD_ID;
    this.ORD_REF_POS = val.ORD_REF_POS;
    this.ORD_REQ_QTY = val.ORD_REQ_QTY;

    this.order_item = val;

    // if(this.selectedItems.includes(val)){
    //   this.selectedItems = this.selectedItems.filter((selected :any) => selected !==val);
    // }
    // else{
    //   this.selectedItems.push(val);
    // }

    // console.log(this.selectedItems);
    
  }


  addOrder(){

    var val={

      MSG_ORD_ID : this.order_item.ORD_ID

    }



    // this.selectedItems.push(val);
    this.selectedItems.push(this.order_item);


    // if(this.selectedItems.includes(val)){
    //   this.selectedItems = this.selectedItems.filter((selected : any) => selected !== val)
    // }
    // else{
    //   this.selectedItems.push(val);
    // }
    
    // console.log(this.selectedItems);



    const index: number = this.orderData.indexOf(this.order_item);
    

     if(this.orderData.includes(this.order_item)){
      this.orderData.splice(index, 1);
      // this.orderData = this.orderData.filter((selected : any) => selected !== this.order_item)
    }

    // if(this.orderData.includes(this.order_item)){
    //   this.orderData = this.orderData.filter((selected : any) => selected !== this.order_item)
    // }


    // else{
    //   this.selectedItems.push(val);
    // }



  }

  onChange(val : any){

    
    const index: number = this.order_return.indexOf(val);
    // this.order_return.push(val);
    if(this.order_return.includes(val)){
      this.order_return.splice(index,1);
    }

    else{
      this.order_return.push(val);
    }


    console.log(this.order_return);

  }

  returnOrder(){


  }



  updateOrder(){

    this.service.updateOrder(this.selectedItems).subscribe(resp =>{

      alert(resp);
    })

  }

  resetForm(){
    this.palletizationForm.reset();
    // this.palletizationForm.reset();
  }
}
