import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { TataService } from 'src/app/services/TataCumminsapi.service';

@Component({
  selector: 'app-empty-pallet-store-out-process',
  templateUrl: './empty-pallet-store-out-process.component.html',
  styleUrls: ['./empty-pallet-store-out-process.component.css']
})
export class EmptyPalletStoreOutProcessComponent {
  
  NoOfPalletStacks:number=0;
  EmptyPalletOutForm!:FormGroup;
  EmptyPalletList:any=[];
 

  constructor(private fb : FormBuilder ,private tataservice : TataService){
    

  }

  ngOnInit():void{
    this.EmptyPalletOutForm=this.fb.group({
      NoOfPalletStacks:['',Validators.required]
    })
  }

  EmptyPalletOut(){
    debugger

      // var val={
      //   PALLET_NUMBER: this.NoOfPalletStacks
        
      // }
      console.log(this.NoOfPalletStacks)
      this.tataservice.getemptypalletout(this.NoOfPalletStacks).subscribe(resp =>{

        this.EmptyPalletList=resp
  
      })
  }
}
