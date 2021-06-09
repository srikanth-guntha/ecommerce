import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { searchService } from '@ecommerce/shared/services';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Book } from '@ecommerce/shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecommerce-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchString: FormControl = new FormControl();
  public searchBooks: Book[] = [];
  public showDelete: boolean = false;
  searchSubscription: Subscription = new Subscription();

  constructor(private searchService: searchService, private router: Router) {}

  ngOnInit(): void {
    this.showBooksBySearch();
  }

  showBooksBySearch() {
    this.searchSubscription = this.searchString.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((val) => this.searchService.getBooksBySearch(val))
      )
      .subscribe((response: any) => {
        this.searchBooks = response.items;
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
