import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistNumber = new BehaviorSubject(0);

  headers: any = {
    token: localStorage.getItem('userToken'),
  }
  baseUrl:string=`https://ecommerce.routemisr.com/api/v1`;

  constructor(private _http:HttpClient) {
    this.getWishlist().subscribe({
      next:(response)=>{console.log(response);
        this.wishlistNumber.next(response.count)

      },
      error:(error)=>{console.log(error);
      }
    })
  }

  addToWishlist(productId:string):Observable<any>{
    return this._http.post(this.baseUrl + `/wishlist`,
    {
      productId:productId
    },
    {

      headers: this.headers

    })

  }

  getWishlist():Observable<any>{
   return this._http.get(this.baseUrl + `/wishlist`,
    {
      headers: this.headers
    })
  }

  removeWishlistProduct(productId:string):Observable<any>{
    return this._http.delete(this.baseUrl + `/wishlist/${productId}`,
    {
      headers: this.headers
    })
  }
}
