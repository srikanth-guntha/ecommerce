import { Component, Input, OnInit } from '@angular/core';
import { Book } from '@ecommerce/shared/services';

@Component({
  selector: 'ecommerce-mycollection',
  templateUrl: './mycollection.component.html',
  styleUrls: ['./mycollection.component.scss'],
})
export class MycollectionComponent implements OnInit {
  public bookCollection!: Book[];
  public showDelete: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.showCollection();
  }

  showCollection() {
    this.bookCollection = JSON.parse(
      localStorage.getItem('bookCollection') || '[]'
    );
  }
}
