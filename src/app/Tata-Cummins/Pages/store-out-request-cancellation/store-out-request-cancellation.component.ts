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

  constructor( private router: TataService){

  }

  ngOnInit(){
      this.GetStoreOutRequest();
  }

  Discard(){

    debugger
    this.Confirmlist.forEach((Element:any)=>{
      let val={
        ORD_ID:Element.ORD_ID
      }

      this.secondList.push(val)
    })
    
    this.router.UpdateOrderItem(this.secondList).subscribe(resp =>{
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
    return this.router.GetStoreOutRequest().subscribe(res=>{
          this.StoreOutRequestCancellationlist=res
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

}
