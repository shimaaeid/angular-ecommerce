import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent  {

  cartId!:string ;

  constructor(private _cart:CartService){}
  ngOnInit(): void{
    this.getLoggedUserCart();
    // console.log(this.cartId)
  }

  checkOut = new FormGroup({
    details: new FormControl(),
    phone: new FormControl(),
    city: new FormControl(),

  })

  getLoggedUserCart(){
    this._cart.getLoggedUserCart().subscribe({
      next:(response)=>{

        console.log('this is card ID');

        console.log(response.data._id);
        console.log(response.data.cartOwner);
        this.cartId = response.data._id
      },
      error:(error)=>{console.log(error);
      }
    })
  }

  payment(form:FormGroup){
    // console.log(form.value);
    console.log('CHECKOUT FORM')
    // console.log(this.cartId);
    this._cart.checkOut(this.cartId,form.value).subscribe({
      next:(response)=>{

        console.log(response);
        window.location = response.session.url
      },
      error:(error)=>{console.log(error);
      }
    })

  }

}
