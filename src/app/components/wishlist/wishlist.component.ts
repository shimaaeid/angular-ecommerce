import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/interfaces/products';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  productList:Products[] = [];
  wishlistData:string[]=[];
  isLoading:boolean=true;

  constructor(private _wishlish:WishlistService, private _cart:CartService,private toastr: ToastrService){}
  ngOnInit(): void {

    this._wishlish.getWishlist().subscribe({
      next:(response)=>{console.log(response);
        this.productList = response.data;
        const newData = response.data.map((item:any)=> item._id);
        console.log("newData", newData);
        this.wishlistData = newData;

        this._wishlish.wishlistNumber.next(this.wishlistData.length)
      },
      error:(error)=>{console.log(error);
      }
    })

  }

  addToWishlist(productId:string){
    this._wishlish.addToWishlist(productId).subscribe({
      next:(response)=>{console.log(response);
        this.toastr.success(response.message);
        this._wishlish.wishlistNumber.next(this.wishlistData.length);
      },
      error:(error)=>{console.log(error);
      }
    })

  }

  addToCart(productId:string){
    this._cart.addToCart(productId).subscribe({
      next:(response)=>{console.log(response);
        this.wishlistData = response.data;
        this._cart.cartNumber.next(response.numOfCartItems);
        this.toastr.success(response.message,'',{
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-center-center'
        });

      },
      error:(error)=>{console.log(error);
      }
    })
  }

  removeWishlistProduct(productId:string){
    this._wishlish.removeWishlistProduct(productId).subscribe({
      next:(response)=>{ console.log(response);
        this.wishlistData = response.data;
        this.toastr.success(response.message);

        const newProductData = this.productList.filter( (item:any)=> this.wishlistData.includes(item._id));
        this.productList = newProductData;

        this._wishlish.wishlistNumber.next(this.wishlistData.length);

        // this._wishlish.getWishlist().subscribe({
        //   next:(response)=>{
        //     this.productList = response.data;
        //   },
        //   error:(error)=>{console.log(error);
        //   }
        // })

      },
      error:(error)=>{console.log(error);
      }

    })

  }


}
