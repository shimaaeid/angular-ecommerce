import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.scss']
})
export class MycartComponent implements OnInit {
  cartItem:any;
  constructor(private _cart:CartService){}

  ngOnInit():void{
    this.getLoggedUserCart();
  }

  getLoggedUserCart(){
    this._cart.getLoggedUserCart().subscribe({
      next:(response)=>{console.log(response);
        this.cartItem = response.data
      },
      error:(error)=>{console.log(error);
      }
    })
  }

  updateCartProductQuantity(id:string, count:number){
    if(count == 0){
      this.deleteCartProduct(id)
    }
    this._cart.updateCartProductQuantity(id,count).subscribe({
      next:(response)=>{
        console.log(response);
        this.cartItem = response.data


      },
      error:(error)=>{console.log(error);
      }

    })
  }

  deleteCartProduct(id:string){
    this._cart.deleteCartProduct(id).subscribe({
      next:(response)=>{console.log(response);
        this.cartItem = response.data;
        this._cart.cartNumber.next(response.numOfCartItems);
      },
      error:(error)=>{console.log(error);
      }

    })

  }

}
