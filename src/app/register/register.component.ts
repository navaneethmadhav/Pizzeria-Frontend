import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  uname="";
  phn="";
  email="";
  pswd="";

  registerForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    email:['',[Validators.required,Validators.email]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]],
    phn:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]]
  })

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register(){
    // alert('clicked')
    console.log(this.registerForm);
    

    var username=this.registerForm.value.uname;
    var password=this.registerForm.value.pswd;
    var email=this.registerForm.value.email;
    var phone=this.registerForm.value.phn;
    if(this.registerForm.valid){
      // console.log(this.registerForm.get('uname')?.errors);
      
      this.ds.register(username,password,email,phone)
      .subscribe((result:any)=>{
        alert(result.message)
        this.router.navigateByUrl('login')
      },
      result=>{
        alert(result.error.message)
      })
    }
    // else{
    //   alert('Invalid form')
    // }
  }
}
