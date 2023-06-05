import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TataService } from 'src/app/services/TataCumminsapi.service';
import { NgToastService } from 'ng-angular-popup';

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
              public tataservice: TataService,
              private toast: NgToastService) { }

  ngOnInit(): void {
   
    this.loginForm = this.fb.group({

      username : ['',Validators.required],
      password : ['',Validators.required]

    })

  }

  
  login(){
    
    if(this.loginForm.valid){
            
            var data ={

              username : this.username,
              password : this.password
            }

            this.tataservice.login(data).subscribe( (resp:any) =>{
             
              if(resp.message == 'Success'){
                this.toast.success({detail:"Login Successfully",duration:5000});
                this.router.navigate(['/Dashboard']);
              }
              else{
                
                this.toast.warning({detail:'Login Failed',duration:5000});
                this.loginForm.reset();
              }

            })


            
      }
      else{
        this.loginForm.markAllAsTouched();
      }
    
  }

    
  
  
}

