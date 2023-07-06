import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  username:any;

  constructor(private auth: MyService, private router: Router){

  }

  ngOnInit(){
    this.username=localStorage.getItem("Username")
  }

  logout(){
    
    localStorage.clear();
    this.auth.signOut();
    // this.router.navigate(['/login']);
  }
}
