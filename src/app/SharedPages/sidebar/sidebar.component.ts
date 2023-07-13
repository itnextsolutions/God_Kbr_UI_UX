import { Component, Renderer2 } from '@angular/core';
import { MyService } from 'src/app/services/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  MenuList:any=[];
  child :any=[];
  //@ViewChild('tatacumminssidebar') sidebarRef!: ElementRef;
  isSidebarOpen = false;

constructor(private router:MyService,private renderer: Renderer2){}

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
