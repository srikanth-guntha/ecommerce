import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BadgeService, BookService } from '@ecommerce/shared/services';
import { Book } from '@ecommerce/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'ecommerce-bookinfo',
  templateUrl: './bookinfo.component.html',
  styleUrls: ['./bookinfo.component.scss'],
})
export class BookinfoComponent implements OnInit {
  bookInfo: Book = {};
  bookId: string = '';
  books: Book[] = [];
  duplicateBook: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private bookService: BookService,
    private route: Router,
    private badgeService: BadgeService
  ) {}

  ngOnInit(): void {
    this.showBookInfo();
  }

  showBookInfo() {
    this.bookId = this.router.snapshot.queryParamMap.get('id') || '';
    this.bookService.getBookInfo(this.bookId).subscribe((response) => {
      this.bookInfo = response;
    });
  }

  addToCart(book: Book) {
    this.books.push(...JSON.parse(localStorage.getItem('cart') || '[]'));
    this.books.forEach((eachBook: any) => {
      if (eachBook.id == book.id) {
        this.duplicateBook = true;
      }
    });
    if (!this.duplicateBook) {
      this.books.push(book);
      localStorage.setItem('cart', JSON.stringify(this.books));
    }
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.badgeService.sendMessage(cartItems.length);
  }

  buy(book: Book) {
    this.route.navigate(['/billing'], {
      queryParams: { data: JSON.stringify(book) },
    });
  }
}
