// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

// }
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  signupUsers: any[] = [];
  signupObj: any = {
    username: '',
    email: '',
    password: ''
  }


  loginObj: any = {
    username: '',
    password: ''
  }

  id: string = "";
  username: string = "";
  password: string = "";
  email: string = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.username);
    console.log(this.password);

  }

  onSingUp(){
   // this.signupUsers.push(this.signupObj);
    //localStorage.setItem('signupUsers',JSON.stringify(this.signupUsers));

    
    var val = {
      Id: this.signupObj.email,
      username: this.signupObj.username,
      password: this.signupObj.password
    };
  }

  login() {
debugger
    var val = {
      username: this.loginObj.username,
      password: this.loginObj.password
    };
    localStorage.setItem('loginUser',JSON.stringify(this.loginObj));
  }
}

