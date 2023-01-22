import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser="";

  currentEmail="";

  constructor(private http:HttpClient) { }

  saveDetails(){
    if(this.userDetails){
      localStorage.setItem('DataBase',JSON.stringify(this.userDetails))
    }
    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    }
    if(this.currentEmail){
      localStorage.setItem('currentEmail',JSON.stringify(this.currentEmail))
    }
  }

  // getDetails(){
  //   if(this.userDetails){
  //     this.userDetails=JSON.parse(localStorage.getItem('DataBase')||'')
  //   }
  //   if(this.currentEmail){
  //     this.currentEmail=JSON.parse(localStorage.getItem('currentEmail')||'')
  //   }
  //   if(this.currentUser){
  //     this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'')
  //   }
  // }

  userDetails:any={
    'akhil01@gmail.com':{username:'Akhil',phone:'9856743486',email:'akhil01@gmail.com',password:1000},
    'manoj123@gmail.com':{username:'Manoj',phone:'9756443287',email:'manoj123@gmail.com',password:1001},
    'edwin147@gmail.com':{username:'Edwin',phone:'6587415211',email:'edwin147@gmail.com',password:1002}
  }

  register(username:any,password:any,email:any,phone:any){

    const data={
      username,
      password,
      email,
      phone
    }
    return this.http.post('http://localhost:3000/register',data)
    // let userDetails=this.userDetails
    // if(email in userDetails){
    //   return false;
    // }
    // else{
    //   userDetails[email]={
    //     username:username,
    //     password:password,
    //     email:email,
    //     phone:phone
    //   }
    //   console.log(userDetails);
    //   this.saveDetails();
    //   return true;
    // }
  }

  login(email:any,password:any){

    const data={
      email,
      password
    }

    return this.http.post('http://localhost:3000/login',data)
    // let userDetails=this.userDetails
    // if(email in userDetails){
    //   if(pswd==userDetails[email]['password']){
    //     this.currentUser=userDetails[email]['username']
    //     this.currentEmail=email;
    //     this.saveDetails();
    //     return true;
    //   }
    //   else{
    //     return false;
    //   }
    // }
    // else{
    //   return false;
    // }
  }
}
