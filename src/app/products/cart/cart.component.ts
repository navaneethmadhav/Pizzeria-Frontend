import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import party from "party-js";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartitems:any=[]
  grand:any;
  updatetotal:any;

  constructor(private cart:CartService,private router:Router,private fb:FormBuilder) { }

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
    this.cart.cartlist.subscribe(
      (data:any)=>{
        this.cartitems=data;
      }
    )
    this.grand=this.cart.gettotal()
  }

  removeitem(product:any){
    this.cart.removecart(product)
    this.grand=this.cart.gettotal()
  }

  removeall(){
    this.cart.removeall()
  }

  discount5per(source:any){
    let discount=(this.grand*5)/100
    this.updatetotal=this.grand-discount
    party.confetti(source)
  }
  discount10per(){
    let discount=(this.grand*10)/100
    this.updatetotal=this.grand-discount
  }
  discount30per(){
    let discount=(this.grand*30)/100
    this.updatetotal=this.grand-discount
  }
  discount50per(){
    let discount=(this.grand*50)/100
    this.updatetotal=this.grand-discount
  }

  proceed(){
    if(this.cartitems.length==1){
      alert('please add more than one item to use cart')
      this.router.navigateByUrl('/products/all-products')
    }
    else{
      if(this.orderForm.valid){
        alert('Your Order is Placed')
        this.router.navigateByUrl('')
        this.removeall()
      }
      else{
        alert('Invalid Form')
      }
    }
    
  }

}
