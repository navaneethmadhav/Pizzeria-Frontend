import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email="";
  pswd="";

  loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-Z]*')]]
  })

  constructor(private router:Router,private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  emailChange(event:any){
    console.log(event);
    
    this.email=event.target.value;
    console.log(this.email);
    
  }

  pswdChange(event:any){
    this.pswd=event.target.value;
    console.log(this.pswd);
    
  }

  // login(a:any,p:any){
  //   // alert('clicked')
  //   var email=a.value;
  //   var pswd=p.value;
  //   var userDetails=this.userDetails;

  //   if(email in userDetails){
  //     if(pswd==userDetails[email]['password']){
  //       alert('Login Successful')
  //     }
  //     else{
  //           alert('Invalid Password');
  //         }
  //   }
  //   else{
  //       alert('Invalid Userdetails')
  //     }
  // }

  login(){
    // alert('clicked')
    var email=this.loginForm.value.email;
    var password=this.loginForm.value.pswd;
    var userDetails=this.ds.userDetails;
    if(this.loginForm.valid){
      this.ds.login(email,password)
      
      .subscribe((result:any)=>{
        localStorage.setItem('currentUser',JSON.stringify(result.currentUser));
        localStorage.setItem('currentEmail',JSON.stringify(result.currentEmail));
        alert(result.message);
        this.router.navigateByUrl('all-products')
      },
      result=>{
        alert(result.error.message)
        this.router.navigateByUrl('login')
      }
      )
    //   if(result){
    //     alert('Login Successful')
    //     this.router.navigateByUrl('')
    //   }
    //   else{
    //     alert('Login Failed');
    //     this.router.navigateByUrl('login')
    //   }
    // }
    // else{
    //   alert('Invalid form')
    // }
    }
  }
}
