import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import { ProductsService } from '../../services/products.service';
import { Products } from '../../interfaces/products';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productDetails:any;
  constructor(private _Activated:ActivatedRoute,private toastr: ToastrService, private _product:ProductsService,private _cart:CartService){}

  ngOnInit():void{
    let product_id = this._Activated.snapshot.params['product-id'];
    // console.log(product_id);

    this._product.productDetails(product_id).subscribe({
      next:(resopnse)=>{
        this.productDetails = resopnse.data
        // console.log(resopnse.data);
      },
      error:(error)=>{console.log(error);
      }
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

}
