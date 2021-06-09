import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '@ecommerce/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'ecommerce-mat-card-list',
  templateUrl: './mat-card-list.component.html',
  styleUrls: ['./mat-card-list.component.scss'],
})
export class MatCardListComponent implements OnInit {
  @Input()
  bookList!: Book[];
  @Input()
  showDelete!: boolean;

  @Output() deleteBook = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  showBookInfo(book: Book) {
    this.router.navigate(['/bookinfo'], { queryParams: { id: book.id } });
  }

  delete(event: any, book: Book) {
    event.stopImmediatePropagation();
    this.deleteBook.emit(book);
  }

  trackByFn(book: any): string {
    return book.id;
  }
}
