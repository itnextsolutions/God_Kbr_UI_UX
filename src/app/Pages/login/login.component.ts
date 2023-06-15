import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import { NgToastService } from 'ng-angular-popup';

import { MyService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginForm !: FormGroup;
  
  username: string = "";
  password: string = "";
  UserRole:any=[];

  constructor(private router: Router,
              private auth : MyService,
              private fb :FormBuilder,
              public tataservice: TataService,
              private toast: NgToastService) { }

  ngOnInit(): void {
   
    this.loginForm = this.fb.group({

      username : ['',Validators.required],
      password : ['',Validators.required]

    })

  }

  
  login(){
      ;

      if(this.loginForm.valid){
            
            var data ={

              username : this.username,
              password : this.password
            }

            this.tataservice.login(data).subscribe( (resp:any) =>{
              // ;
              console.log(resp);

              if(resp.message == 'Success'){
                console.log("User Logged in"+resp.message);
                this.UserRole=resp.role;
                localStorage.setItem("Username",this.username)
                localStorage.setItem("User_Id",this.UserRole)
                this.auth.storageToken(resp.jwtToken);
                this.router.navigate(['/Dashboard']);
              }
              else{
                console.log("User Logged Failed");
                alert("fail");
              }

            })


            
      }
      else{
        this.loginForm.markAllAsTouched();
      }
    
  }
  
}

