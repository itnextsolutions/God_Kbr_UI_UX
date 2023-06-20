import { Component } from '@angular/core';
import { TataService } from 'src/app/services/TataCumminsapi.service';

@Component({
  selector: 'app-tata-cummins-sidebar',
  templateUrl: './tata-cummins-sidebar.component.html',
  styleUrls: ['./tata-cummins-sidebar.component.css']
})
export class TataCumminsSidebarComponent {

  MenuList:any=[];
  child :any=[];

constructor(private router:TataService){}

  ngOnInit(){

    

    var userid=localStorage.getItem("User_Id")
    return this.router.GetMenuList(userid).subscribe(resp=>{
      this.MenuList=resp
  })
  }

  trigger(val:any){
   debugger
    this.child=this.MenuList.filter((x: any) => x.OP_PAR6 == val)

  }

}
