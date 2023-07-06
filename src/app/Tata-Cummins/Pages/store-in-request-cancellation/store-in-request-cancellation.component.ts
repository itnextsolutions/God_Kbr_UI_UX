import { Component } from '@angular/core';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-in-request-cancellation',
  templateUrl: './store-in-request-cancellation.component.html',
  styleUrls: ['./store-in-request-cancellation.component.css']
})
export class StoreInRequestCancellationComponent {

  pageSizeOptions = [5, 10, 25, 50];
  StoreInRequestCancellationlist:any=[]
  Confirmlist:any=[]
  secondList:any=[];
  ORD_ID:number=0;
  term ='';
  Message:any;
  pallet_search ='';
  pageSize: number = 1;
  itemsPerPage: number = 10;

  constructor( private router: TataService){

  }

  ngOnInit(){
      this.GetStoreOutRequest();
  }

  Alert(){
    Swal.fire({
     title: 'Please Recheck the Selected Data For Discard Process',
     icon: 'success',
     showCancelButton: true,
     confirmButtonText: 'Yes, Confirm!',
     cancelButtonText: 'Not, Confirm'
   }).then((result) => {
     if (result.value) {
     this.Discard();
     } else if (result.dismiss === Swal.DismissReason.cancel) {
       Swal.fire(
         'You Can not Continue With Your Operation',
       )
     }
   })
  }

  Discard(){

    ;
    this.Confirmlist.forEach((element:any)=>{
      var val={
        HU_ID : element.HU_ID
      }

      this.secondList.push(val)
    })
    console.log(this.secondList);
    this.router.UpdateHU_ID(this.secondList).subscribe(resp =>{
     
      if(resp != null || resp != undefined)
      {
        if(resp == 0){
          this.Message="Data Has Not Been Updated & Inserted"
          this.FailAlert(this.Message);
        }
        else if(resp == 1){
          this.Message="Data Has Been Updated & Inserted Sucessfully "
          this.SucessAlert(this.Message);
        }
        else{
          this.ErrorAlert();
        }
       
      }
      else{
       this.ErrorAlert
      }
    })
  }


  GetStoreOutRequest(){
    
    return this.router.GetStoreInRequest().subscribe(resp=>{
      if(resp != null && resp != undefined)
      {
        this.StoreInRequestCancellationlist=resp
      }
      else
      {
        this.ErrorAlert();
      }
      })
  }

  isCheked(data:any){
    
    const index = this.Confirmlist.indexOf(data);


    if (this.Confirmlist.includes(data)) {
      this.Confirmlist.splice(index, 1);
    }
    else {
      this.Confirmlist.push(data);
    }

    console.log(this.Confirmlist);

  }



  successAlert(){

      Swal.fire({
      title: 'Pallet has been Discarded',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
      location.reload();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'You Can not Continue With Your Operation',
        // )
      }
    })

  }

    errorAlert(){  
   
      Swal.fire({  
        position: 'top', 
        icon: 'error',  
        title: 'Oops...',  
        text: 'Something Went Wrong!',  
        showConfirmButton: true,  
        timer: 3000 
      })  
    }

  
  

  Reset(){
  
    Swal.fire({
      title: 'Are you sure want to Reset',
      text: 'You will not be able to recover this operation',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reset It!',
      cancelButtonText: 'Not, Reset'
    }).then((result) => {
      if (result.value) {
        this.StoreInRequestCancellationlist =[];
        this.Confirmlist =[];
        location.reload()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'You Can Continue With Your Operation',
        )
      }
    })
  }

  SucessAlert(Message:any){
    Swal.fire({
      title: Message,
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
      location.reload();
      } 
    })
  }

  FailAlert(Message:any){
    Swal.fire({
      title: Message,
      icon: 'info',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
      location.reload();
      } 
    })

  }
  
  ErrorAlert(){
    Swal.fire({  
      position: 'top', 
      icon: 'error',  
      title: 'Oops...',
      showConfirmButton: true,  
      timer: 5000 
    })
  }

}
