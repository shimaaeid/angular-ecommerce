import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

  switch = 1;
  cur_year = 0;

  constructor() {
  }

  ngOnInit() {
    this.cur_year = new Date().getFullYear();
  }







}
