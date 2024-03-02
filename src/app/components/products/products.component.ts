import { CartService } from '../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../interfaces/products';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList:Products[] = [];
  wishlistData:string[]=[];
  isLoading:boolean=true;
  searchValue:string='';

  constructor(private _products:ProductsService, private _cart:CartService, private toastr: ToastrService, private _wishlish:WishlistService){}

  ngOnInit() :void{
    this._products.getProducts().subscribe({
      next:(response)=>{
        this.productList = response.data;
        this.isLoading=false;
      },
      error:(error)=>{console.log(error);
      },
      complete:()=>{}
    })

    this._wishlish.getWishlist().subscribe({
      next:(response)=>{console.log(response.data)
        const newData = response.data.map((item:any)=> item._id);
        console.log("newData", newData);
        this.wishlistData = newData;
        this._wishlish.wishlistNumber.next(this.wishlistData.length);


      },
      error:(error)=>{console.log(error)}
    })

  }

  addToCart(productId:string){
    this._cart.addToCart(productId).subscribe({
      next:(response)=>{console.log(response);
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

  addToWishlist(productId:string){
    this._wishlish.addToWishlist(productId).subscribe({
      next:(response)=>{console.log(response);
        this.wishlistData = response.data;
        this._wishlish.wishlistNumber.next(this.wishlistData.length);
        this.toastr.success(response.message);

      },
      error:(error)=>{console.log(error);
      }
    })

  }

  removeWishlistProduct(productId:string){
    this._wishlish.removeWishlistProduct(productId).subscribe({
      next:(response)=>{ console.log(response);

        this.wishlistData = response.data;
        this.toastr.success(response.message)
        this._wishlish.wishlistNumber.next(this.wishlistData.length);

      },
      error:(error)=>{console.log(error);
      }

    })

  }

}
