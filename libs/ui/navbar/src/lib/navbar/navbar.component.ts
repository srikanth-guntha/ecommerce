import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ecommerce-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public navList: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.navList = ['search', 'cart', 'collection'];
  }
}
