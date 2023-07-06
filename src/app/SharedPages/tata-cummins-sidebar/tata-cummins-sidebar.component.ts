import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { TataService } from 'src/app/services/TataCumminsapi.service';

@Component({
  selector: 'app-tata-cummins-sidebar',
  templateUrl: './tata-cummins-sidebar.component.html',
  styleUrls: ['./tata-cummins-sidebar.component.css']
})
export class TataCumminsSidebarComponent {

  MenuList:any=[];
  child :any=[];
  @ViewChild('tatacumminssidebar') sidebarRef!: ElementRef;
  isSidebarOpen = false;

constructor(private router:TataService,private renderer: Renderer2){}

  ngOnInit(){
    var userid=localStorage.getItem("User_Id")
    return this.router.GetMenuList(userid).subscribe(resp=>{
      this.MenuList=resp
      const listString = JSON.stringify(this.MenuList);
      localStorage.setItem("menu",listString)
      
  this.closeSidebar()
  })
  }
 

  openSidebar(): void {
    
    this.isSidebarOpen = true;
  }

  toggleSidebar(){
    this.isSidebarOpen=!this.isSidebarOpen;
  }

  closeSidebar() {
    
    this.isSidebarOpen = false;
  }

  trigger(val:any){
   
    this.child=this.MenuList.filter((x: any) => x.OP_PAR6 == val)
  }

  
}
