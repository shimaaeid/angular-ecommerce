import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoryComponent } from './components/category/category.component';
import { MycartComponent } from './components/mycart/mycart.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { SigninComponent } from './components/authComponent/signin/signin.component';
import { SignupComponent } from './components/authComponent/signup/signup.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { authGuard } from './auth.guard';
import { ForgotPasswordComponent } from './components/authComponent/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/authComponent/reset-password/reset-password.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {path:'' ,redirectTo: 'home', pathMatch:'full'},
  {path:'signin', component:SigninComponent, title:'SignIn'},
  {path:'signup', component:SignupComponent, title:'SignUP'},
  {path:'forgot-password', component:ForgotPasswordComponent, title:'forgot-password'},
  {path:'reset-password', component:ResetPasswordComponent, title:'reset-password'},
  {path:'home' ,canActivate:[authGuard] ,component:HomeComponent, title:'Home'},

  {path:'brands', canActivate:[authGuard] ,component:BrandsComponent, title:'Brands'},
  {path:'category', canActivate:[authGuard] ,component:CategoryComponent, title:'Category'},
  {path:'mycart', canActivate:[authGuard] ,component:MycartComponent, title:'MyCart'},
  {path:'checkout', canActivate:[authGuard] ,component:PaymentComponent, title:'Checkout'},
  {path:'allorders',canActivate:[authGuard] , component:OrderComponent, title:'all-orders'},
  {path:'products', canActivate:[authGuard] ,component:ProductsComponent, title:'Products'},
  {path:'product-details/:product-id',canActivate:[authGuard] , component:ProductDetailsComponent, title:'product-details'},
  {path:'profile', canActivate:[authGuard] ,component:ProfileComponent, title:'Profile'},
  {path:'wishlist',canActivate:[authGuard] , component:WishlistComponent, title:'WishList'},
  {path:'**', component:NotfoundComponent, title:'NotFound'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
