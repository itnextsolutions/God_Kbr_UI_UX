import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs/internal/observable/timer';
import { map } from 'rxjs/internal/operators/map';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import { MyService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public users:any =[];
  No_Of_Pallets:any;
  Ord_Initiated:any;
  Ord_Completed:any;
  CraneNo:any;
  PalletList:any=[];
  CraneList:any=[];
  secondList:any=[];
  timerSubscription:any;

  username:any;
  constructor(private auth: MyService, private router: Router,private tataservice: TataService){
  }

  ngOnInit(){
    // this.auth.getUsers().subscribe(res=>{
    //   this.users = res;
    //   console.log(this.users);
    // })
    // this.timerSubscription = timer(0, 100000000).pipe( 
    //   map(() => { 
    //     this.CraneList=[];
    //     this.secondList=[];
    //     this.GetDashBoardCount(); 
    //   }) 
    // ).subscribe();
    this.GetDashBoardCount();
    setInterval(() => {
      this.CraneList=[];
      this.secondList=[];
      this.GetDashBoardCount();
    }, 10000000);

    this.username=localStorage.getItem("Username")
  }

  GetDashBoardCount(){
    
    this.tataservice.GetDashBoardCount().subscribe((resp:any)=>{
      if(resp != null)
      {
         this.No_Of_Pallets=resp[0]['NO_OF_PALLETS'],
         this.Ord_Initiated=resp[0]['ORD_INITIATED'],
         this.Ord_Completed=resp[0]['ORD_COMPLETED']
      }
      
    this.GetPalletStatus();
    })
  }

  GetPalletStatus(){
  debugger
    this.tataservice.GetPalletStatus().subscribe((resp:any)=>{
      if(resp != null){
        this.PalletList=resp
      }
    })
    this.GetCraneStatus();

  }

  GetCraneStatus(){
   
    // for (var i = 1; i <= 4; i++)
    // {this.tataservice.GetCraneStatus(i).subscribe((resp:any)=>{
    //   if(resp != null){
    //     this.secondList=resp
    //     this.secondList.forEach((Element:any)=>{
    //       let val={
    //         STOREIN :Element.STOREIN,
    //         STOREOUT :Element.STOREOUT,
    //         TRANSFER :Element.TRANSFER,
    //      }
         
    //       this.CraneList.push(val);
    //       console.log(this.CraneList)
    //     })
    //   }
    // })
    // }
    this.tataservice.GetCraneStatus().subscribe((resp:any)=>{
      this.CraneList=resp
    })
    
  }

  logout(){
    localStorage.clear();
    this.auth.signOut();
  }
  
}
