import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '@ecommerce/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'ecommerce-mat-card-list',
  templateUrl: './mat-card-list.component.html',
  styleUrls: ['./mat-card-list.component.scss'],
})
export class MatCardListComponent {
  @Input()
  bookList!: Book[];
  @Input()
  showDelete!: boolean;

  @Output() deleteBook = new EventEmitter();

  constructor(private router: Router) {}

  showBookInfo(book: Book) {
    this.router.navigate(['/bookinfo'], { queryParams: { id: book.id } });
  }

  delete(event: any, book: Book) {
    event.stopImmediatePropagation();
    this.deleteBook.emit(book);
  }

  trackByFn(index: number, book: Book): string {
    return book.id;
  }
}
