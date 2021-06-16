import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Book, BookService } from '@ecommerce/shared/services';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecommerce-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchString: FormControl = new FormControl();
  public searchBooks: Book[] = [];
  public showDelete = false;
  searchSubscription: Subscription = new Subscription();

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.showBooksBySearch();
  }

  showBooksBySearch() {
    this.searchSubscription = this.searchString.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((val) => this.bookService.getBooksBySearch(val))
      )
      .subscribe((response: Book[]) => {
        this.searchBooks = response;
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
