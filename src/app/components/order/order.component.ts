import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {

  userID: string = '';
  orders: any[] = [];



  constructor(private _order: OrderService, private _cart: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log('this is user data from order ts');

  //  console.log(this._auth.userDate);

  let encodedToken:any = localStorage.getItem('userToken');
   let decodedToken:any = jwtDecode(encodedToken);
   this.userID = decodedToken.id


    this._order.getUserOrders(this.userID).subscribe({
      next: (response) => {
        console.log('this is user orders');
        console.log(response);

        this.orders = response;



        console.log('UserID');
        console.log(this.userID);


      },
      error: (error) => {
        console.log(error);
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
