import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allproducts:[],searchkey:string,name:string): any[] {

    const result:any=[];

    if(!allproducts || searchkey=='' || name==''){
      return allproducts;
    }

    allproducts.forEach((product:any)=>{
      // console.log(product.name);
      
      if(product.name.trim().toLowerCase().includes(searchkey.toLowerCase())){
        result.push(product);
      }
    })

    return result;
  }

}
