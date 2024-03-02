import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  BaseUrl:string = `https://ecommerce.routemisr.com`;

  constructor(private _http:HttpClient) { }

  getBrands():Observable<any>{
    return this._http.get(`${this.BaseUrl}/api/v1/brands`)
  }
}
