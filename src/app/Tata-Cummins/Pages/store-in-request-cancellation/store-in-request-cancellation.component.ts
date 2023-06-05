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

    debugger
    this.Confirmlist.forEach((Element:any)=>{
      let val={
        HU_ID:Element.HU_ID
      }

      this.secondList.push(val)
    })
    
    this.router.UpdateHU_ID(this.secondList).subscribe(resp =>{
      Swal.fire({
        title: resp,
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.value) {
        location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'You Can not Continue With Your Operation',
          )
        }
      })
    })
  }


  GetStoreOutRequest(){
    debugger
    return this.router.GetStoreInRequest().subscribe(res=>{
          this.StoreInRequestCancellationlist=res
      })
  }

  isCheked(data:any){
    debugger
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
    debugger
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

}
