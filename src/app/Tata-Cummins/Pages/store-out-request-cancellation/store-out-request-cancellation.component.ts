
import { Component } from '@angular/core';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-store-out-request-cancellation',
  templateUrl: './store-out-request-cancellation.component.html',
  styleUrls: ['./store-out-request-cancellation.component.css']
})
export class StoreOutRequestCancellationComponent {

  pageSizeOptions = [5, 10, 25, 50];
  StoreOutRequestCancellationlist:any=[]
  Confirmlist:any=[]
  secondList:any=[];
  ORD_ID:number=0;
  Message:any;

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
     this.Discard()
     } else if (result.dismiss === Swal.DismissReason.cancel) {
       Swal.fire(
         'You Can not Continue With Your Operation',
       )
     }
   })
 }

  Discard(){

    
    this.Confirmlist.forEach((Element:any)=>{
      let val={
        ORD_ID:Element.ORD_ID
      }

      this.secondList.push(val)
    })
    
    this.router.UpdateOrderItem(this.secondList).subscribe(resp =>{
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
    
    return this.router.GetStoreOutRequest().subscribe(resp=>{
      if(resp != null && resp != undefined)
      {
        this.StoreOutRequestCancellationlist=resp
      }
      else
      {
        Swal.fire({
          title: resp,
          icon:'error',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.value) {
          } 
        })
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
        this.StoreOutRequestCancellationlist =[];
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
