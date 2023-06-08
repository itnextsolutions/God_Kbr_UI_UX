import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public users:any =[];
  constructor(private auth: MyService, private router: Router){

  }

  ngOnInit(){
    this.auth.getUsers().subscribe(res=>{
      this.users = res;
      console.log(this.users);
    })
  }

  logout(){
    // debugger;
    localStorage.clear();
    this.auth.signOut();
    // this.router.navigate(['/login']);
  }
  
}
