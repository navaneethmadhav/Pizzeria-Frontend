import { Component, OnInit } from '@angular/core';
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

  constructor(private api:ApiService,private cart:CartService,private router:Router) { }

  ngOnInit(): void {
    this.api.getProducts().subscribe(
      (data:any)=>{
        this.allproducts=data.products
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
      alert('Your Order is Placed')
    }
    
  }
}
