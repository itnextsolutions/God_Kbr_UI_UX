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

  public pageName: string = "Empty Pallet In Process";
  EmptyPalletForm !: FormGroup;
  palletId :number | undefined;
  palletCount : number | undefined;
  msg : string='';

  constructor(private fb :FormBuilder,
              private tataservice: TataService){}

  ngOnInit(){
    this.EmptyPalletForm = this.fb.group({
      // palletId :['',[Validators.required,Validators.pattern('^[0-9]{5}$')]],
      palletId :['',[Validators.required,Validators.min(10001),Validators.max(99999)]],
      palletCount :['',[Validators.required,Validators.pattern('^[1-7]{1}$')]]
    })
  }


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
        
        if(resp == 1){
          this.sucessAlert();
          
        }
        else if(resp == 2){
          this.msg ="Pallet Is Already Exist"
          this.errorAlert(this.msg);
        }
        else if(resp == 3){
          this.msg ="Pallet Is Not In DataBase"
          this.errorAlert(this.msg);
        }
       else if(resp == 4){
          this.msg ="Location Not Available"
          this.errorAlert(this.msg);
        }
        else{
          this.msg ="Error"
          this.errorAlert(this.msg);
        }
        
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
       timer: 5000
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'You Can not Continue With Your Operation',
        )
      }
    })
    
  }

  confirmationAlert(){
    Swal.fire({
    title: 'Are you sure want to Continue',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Not'
  }).then((result) => {
    if (result.value) {
    this.addEmptyPallet();
    
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Swal.fire(
      //   'You Can not Continue With Your Operation',
      // )
    }
  })
}

  errorAlert(msg:any){  
   
    Swal.fire({  
      position: 'top', 
      icon: 'error',  
      title: 'Oops...',  
      text: msg,  
      showConfirmButton: true,  
      timer: 5000 
    })  
  }

  //Use for Reset Form
  resetAlert(){
    
    Swal.fire({
      title: 'Are you sure want to Reset',
      text: 'You will not be able to recover this operation',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reset It',
      cancelButtonText: 'Not, Reset'
    }).then((result) => {
      if (result.value) {
      
        window.location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'You Can Continue With Your Operation',
        // )
      }
    })
  }

}
