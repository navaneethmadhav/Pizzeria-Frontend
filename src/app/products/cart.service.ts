import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartarray:any=[]
  cartlist=new BehaviorSubject([])
  user="";

  constructor(private ds:DataService,private router:Router) {
    // this.user=this.ds.currentUser
   }

  addcart(product:any){
    
    // this.user=JSON.parse(localStorage.getItem('currentUser')||'')
    // console.log(this.user);
    if(!localStorage.getItem('currentEmail')){
      alert('Please Login First')
      this.router.navigateByUrl('login')
    }
    else{
      this.cartarray.push(product);
      this.cartlist.next(this.cartarray)
      console.log(this.cartlist);
    }
    

    let total=this.gettotal();
    console.log(total);
    
  }

  gettotal(){
    var grandsum=0;
    this.cartarray.map((item:any)=>{
      grandsum+=item.price
    })
    return grandsum;
  }

  removecart(product:any){
    this.cartarray.map((item:any,index:any)=>{
      if(product.id==item.id){
        this.cartarray.splice(index,1)
      }
    })
    this.cartlist.next(this.cartarray)
  }

  removeall(){
    this.cartarray=[];
    this.cartlist.next(this.cartarray)
  }
}
