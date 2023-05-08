import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  searchkey=new BehaviorSubject('')

  constructor(private http:HttpClient) { }

  // getProducts(){
  //   return this.http.get('http://localhost:3000/all-products')
  // }
  getFood(){
    return this.http.get('http://localhost:3000/all-products')
  }

  // to get single product data

  getfooddetails(id:any){
    return this.http.get('http://localhost:3000/all-products/'+id)
  }
}
