import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartNumber!:number;
  wishlistNumber!:number;
  isLogin: boolean = false;

  constructor(private _auth: AuthService, private _cart:CartService, private _wishlish:WishlistService) {

    _auth.userDate.subscribe({

      next: () => {

        if (_auth.userDate.getValue() !== null) {
          this.isLogin = true

        }
        else {
          this.isLogin = false
        }

      }
    })

  }

  ngOnInit():void{
    this._cart.cartNumber.subscribe({
      next:(response)=>{console.log(response);
        this.cartNumber = response
      },
      error:(error)=>{console.log(error);
      }
    })

    this._wishlish.wishlistNumber.subscribe({
      next:(response)=>{
        console.log("from navbar wishlist",response);
        this.wishlistNumber = response
      },
      error:(error)=>{console.log(error);
      }
    })

  }

  logout():void{
    this._auth.logout();

  }

}
