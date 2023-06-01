import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TataService } from 'src/app/services/TataCumminsapi.service';
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
              private fb :FormBuilder,
              public tataservice: TataService) { }

  ngOnInit(): void {
   
    this.loginForm = this.fb.group({

      username : ['',Validators.required],
      password : ['',Validators.required]

    })

  }

  
  login(){
      debugger;

      if(this.loginForm.valid){
            
            var data ={

              username : this.username,
              password : this.password
            }

            this.tataservice.login(data).subscribe( (resp:any) =>{

              if(resp == 'Success'){
                
                this.router.navigate(['/emptyPalletStoreOut']);
              }
              else{
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

