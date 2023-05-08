import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productid:any
  productdata:any

  constructor( private ar:ActivatedRoute,private api:ApiService,private fb:FormBuilder,private router:Router,private cart:CartService) { }

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

    this.ar.params.subscribe((data:any)=>{
      
      this.productid=data["id"];

    })

    this.api.getfooddetails(this.productid).subscribe((item:any)=>{
      // console.log(item.products);
      this.productdata=item.products
      
    })

  }

  addcart(product:any){
    this.cart.addcart(product)
  }

  proceed(){
    if(!localStorage.getItem('currentEmail')){
      alert('Please Login First')
      this.router.navigateByUrl('login')
      window.location.href='login'
    }
    else{
      if(this.orderForm.invalid){
        alert('Invalid Form')
        this.router.navigateByUrl('all-products')
        window.location.reload()
      }
    }
  }

}
