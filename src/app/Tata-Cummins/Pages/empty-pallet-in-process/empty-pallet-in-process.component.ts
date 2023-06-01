import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empty-pallet-in-process',
  templateUrl: './empty-pallet-in-process.component.html',
  styleUrls: ['./empty-pallet-in-process.component.css']
})
export class EmptyPalletInProcessComponent {

  EmptyPalletForm !: FormGroup;
  palletId :number | undefined;
  palletCount : number | undefined;

  constructor(private fb :FormBuilder,
              private tataservice: TataService){}

  ngOnInit(){
    this.EmptyPalletForm = this.fb.group({
      // palletId :['',[Validators.required,Validators.pattern('^[0-9]{5}$')]],
      palletId :['',[Validators.required,Validators.min(10001),Validators.max(99999)]],
      palletCount :['',[Validators.required,Validators.pattern('^[1-7]{1}$')]]
    })
  }


  // validateInput(event: any) {
  //   const input = event.target.value;
  //   const pattern = /^[^e+-]*$/i; // Regular expression pattern excluding 'e', '+' and '-'
    
  //   if (!pattern.test(input)) {
  //     event.target.value = input.replace(/[e+-]/gi, ''); // Remove 'e', '+' and '-' from the input value
  //   }
  // }


  //Use for Prevent (e,+,-) in input field
  handleKeyDown(event: any) {
    const forbiddenKeys = ['e', '+', '-', '.'];
    
    if (forbiddenKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

 // Use for Barcode Scanner
  handleKeyUp(event: any) {
    
    const barcodeData = event.target.value;
    this.palletId = barcodeData;
  }
  
  // Use for to Save data
  addEmptyPallet(){
    
    if(this.EmptyPalletForm.valid){
      var val ={
        HU_ID :this.palletId,
        HU_VOL : this.palletCount
      }
      
      this.tataservice.insertEmptyPalletData(val).subscribe( resp =>{
        
        if(resp == "Success"){
          this.sucessAlert();
          
        }
        else{
          this.errorAlert();
        }
        this.Reset();
      })
    }
    else{
      this.EmptyPalletForm.markAllAsTouched();
    }
    
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

  //Use for Reset Form
  Reset(){
    // this.EmptyPalletForm.reset();
      window.location.reload();
  }

}
