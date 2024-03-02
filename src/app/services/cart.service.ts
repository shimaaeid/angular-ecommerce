import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber = new BehaviorSubject(0);
  BaseUrl: string = `https://ecommerce.routemisr.com`;

  headers: any = {
    token: localStorage.getItem('userToken'),
  }


  constructor(private _http: HttpClient) {
    this.getLoggedUserCart().subscribe({
      next: (response) => {
        // console.log(response);
        this.cartNumber.next(response.numOfCartItems);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  addToCart(id: string): Observable<any> {

    return this._http.post(`${this.BaseUrl}/api/v1/cart`,
      {
        productId: id
      },
      {
        headers: this.headers
      })

  }

  getLoggedUserCart(): Observable<any> {

    return this._http.get(`${this.BaseUrl}/api/v1/cart`,
      {
        headers: this.headers
      })

  }

  updateCartProductQuantity(id: string, count: number): Observable<any> {

    return this._http.put(`${this.BaseUrl}/api/v1/cart/${id}`,
      {
        count: count
      },
      {
        headers: this.headers
      })

  }

  deleteCartProduct(id: string): Observable<any> {

    return this._http.delete(`${this.BaseUrl}/api/v1/cart/${id}`,

      {
        headers: this.headers
      })

  }



    checkOut(id: string, formDate: any): Observable<any> {

      return this._http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
        {
          shippingAddress: formDate
        },
        {
          headers: this.headers
        })

    }
}
