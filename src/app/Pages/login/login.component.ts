import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TataService } from 'src/app/services/TataCumminsapi.service';
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

  constructor(private router: Router,
              private auth : MyService,
              private fb :FormBuilder,
              public tataservice: TataService) { }

  ngOnInit(): void {
   
    this.loginForm = this.fb.group({

      username : ['',Validators.required],
      password : ['',Validators.required]

    })

  }

  
  login(){
      // debugger;

      if(this.loginForm.valid){
            
            var data ={

              username : this.username,
              password : this.password
            }

            this.tataservice.login(data).subscribe( (resp:any) =>{
              // debugger;
              console.log(resp);

              if(resp.message == 'Success'){
                console.log("User Logged in"+resp.message);
                this.auth.storageToken(resp.jwtToken);
                this.router.navigate(['/Dashboard']);
              }
              else{
                console.log("User Logged Failed");
                alert("fail");
              }

            })


            this.loginForm.reset();
      }
      else{
        this.loginForm.markAllAsTouched();
      }
    
  }
  
}

