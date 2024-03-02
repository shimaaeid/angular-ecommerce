import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDate = new BehaviorSubject(null);

  constructor(private _http:HttpClient, private _router:Router) {

    if( localStorage.getItem('userToken') !== null){
      this.saveUserDate();
    }
  }



  saveUserDate(){
   let encodedToken:any = localStorage.getItem('userToken');
   let decodedToken:any = jwtDecode(encodedToken);

   this.userDate.next(decodedToken);
   console.log(this.userDate);
  }

  logout(){
    localStorage.removeItem('userToken');
    this.userDate.next(null);
    this._router.navigate(['/signin']);
  }

  register(formData:any):Observable<any>{
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formData);
  }

  login(formData:any):Observable<any>{
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,formData)
  }

  forgotPassword(formData:any):Observable<any>{
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,formData)
  }

  verifyCode(formData:any):Observable<any>{
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,formData)
  }

  resetPassword(formData:any):Observable<any>{
    return this._http.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,formData)
  }
}
