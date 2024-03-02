import { Component } from '@angular/core';
import { BrandsService } from 'src/app/services/brands.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {

  brandList:any[] = [];
  isLoading:boolean=true;

  constructor(private _brand:BrandsService){}

  ngOnInit() :void{

    this._brand.getBrands().subscribe({
      next:(response)=>{
        this.brandList = response.data;
        this.isLoading=false;
      },
      error:(error)=>{console.log(error);
      },
      complete:()=>{}
    })

  }

}
