import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allproducts:any=[];
  searchterm:string='';
  filterproducts:any

  constructor(private api:ApiService,private cart:CartService,private router:Router,private fb:FormBuilder) { }

  orderForm=this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    address:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(6),Validators.maxLength(6)]],
    street:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    country:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    phn:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10),Validators.maxLength(10)]],
    email:['',[Validators.required,Validators.email]]
  })

  ngOnInit(): void {
    this.api.getProducts().subscribe(
      (data:any)=>{
        this.allproducts=data.products
        this.allproducts.forEach((product:any)=>{
          Object.assign(product,{quantity:1,total:product.price})
        })
      }
    )
    this.api.searchkey.subscribe(
      (data:any)=>{
        this.searchterm=data
      }
    )
  }

  addcart(product:any){
    this.cart.addcart(product)
  }

  proceed(){
    if(!localStorage.getItem('currentEmail')){
      alert('Please Login First')
      window.location.href='login'
    }
    else{
      if(this.orderForm.valid){
        alert('Your Order is Placed')
        
      }
      else{
        alert('Invalid Form')
      }
    }
    
  }

  // filter(category:any){
  //   this.filterproducts=this.allproducts.filter((item:any)=>{
  //     if(item.categoryId==category || category==""){
  //       return item
  //     }
  //   })
  // }
}
