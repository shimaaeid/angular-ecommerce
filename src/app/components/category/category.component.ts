import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  categoryList:any[] = [];
  isLoading:boolean=true;


  constructor(private _category:CategoryService){}

  ngOnInit() :void{

    this._category.getCategories().subscribe({
      next:(response)=>{
        this.categoryList = response.data;
        this.isLoading=false;
      },
      error:(error)=>{console.log(error);
      },
      complete:()=>{}
    })

  }




}
