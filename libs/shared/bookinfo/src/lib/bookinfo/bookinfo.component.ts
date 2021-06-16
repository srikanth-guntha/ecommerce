import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BadgeService, BookService } from '@ecommerce/shared/services';
import { Book } from '@ecommerce/shared/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecommerce-bookinfo',
  templateUrl: './bookinfo.component.html',
  styleUrls: ['./bookinfo.component.scss'],
})
export class BookinfoComponent implements OnInit, OnDestroy {
  bookInfo: Book = {
    id: '',
  };
  bookId = '';
  books: Book[] = [];
  duplicateBook = false;
  bookSubscription: Subscription = new Subscription();

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
    this.bookSubscription = this.bookService
      .getBookInfo(this.bookId)
      .subscribe((response) => {
        this.bookInfo = response;
      });
  }

  addToCart(book: Book) {
    this.books.push(...JSON.parse(localStorage.getItem('cart') || '[]'));
    this.books.forEach((eachBook: Book) => {
      if (eachBook.id == book.id) {
        this.duplicateBook = true;
      }
    });
    if (!this.duplicateBook) {
      this.books.push(book);
      localStorage.setItem('cart', JSON.stringify(this.books));
    }
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.badgeService.sendMessage(cartItems.length);
  }

  buy(book: Book) {
    this.route.navigate(['/billing'], {
      queryParams: { data: JSON.stringify(book) },
    });
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }
}
