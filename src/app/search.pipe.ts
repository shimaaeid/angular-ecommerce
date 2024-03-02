import { Pipe, PipeTransform } from '@angular/core';
import { Products } from './interfaces/products';
import { UpperCasePipe } from '@angular/common';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Products[], searchword: string): Products[] {
    return products.filter( (product)=> { return product.title.toUpperCase().includes(searchword.toUpperCase()) || product.category.name.toUpperCase().includes(searchword.toUpperCase()) } );
  }

}
