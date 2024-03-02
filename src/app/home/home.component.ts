import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Categories } from '../interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  // standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // imports: [CarouselModule, CommonModule],
})
export class HomeComponent implements OnInit{

  categoryList:Categories[]=[];

  constructor(private _category:CategoryService){}

  ngOnInit(): void {
    this._category.getCategories().subscribe({
      next:(response)=>{
        console.log('categories', response.data);
        this.categoryList =  response.data

      },
      error:(error)=>{console.log(error);
      }
    })
  }


  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['next', 'prev'],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['next', 'prev'],
   items:1,
    nav: false
  }




}
