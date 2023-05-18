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
  palletCount : number =0;

  constructor(private fb :FormBuilder,
              private tataservice: TataService){}

  ngOnInit(){
    this.EmptyPalletForm = this.fb.group({
      palletId :['',Validators.required],
      palletCount :['',Validators.required]
    })
  }

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

  Reset(){
     this.EmptyPalletForm.reset(); 
  }
}
