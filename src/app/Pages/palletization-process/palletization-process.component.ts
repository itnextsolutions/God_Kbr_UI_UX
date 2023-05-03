import { Component } from '@angular/core';
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

  constructor(private router: Router, private service: MyService){

  }

  ngOnInit():void{

    this.getOrderItems();

  }

  getOrderItems(){

    this.service.getOrderItems().subscribe( (resp:any) => {

      this.orderData = resp;
      console.log(this.orderData)
    })

  }


  onSelect(val : any){

    debugger;
    this.ORD_REF_POS = val.ORD_REF_POS;
    this.ORD_REQ_QTY = val.ORD_REQ_QTY;
    console.log(this.ORD_REF_POS);
    console.log(this.ORD_REQ_QTY);
  }
}
