import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { searchService } from '@ecommerce/shared/services';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Book } from '@ecommerce/shared/services';

@Component({
  selector: 'ecommerce-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchString: FormControl = new FormControl();
  public searchBooks: Book[] = [];

  constructor(private searchService: searchService, private router: Router) {}

  ngOnInit(): void {
    this.showBooksBySearch();
  }

  showBooksBySearch() {
    this.searchString.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((val) => this.searchService.getBooksBySearch(val))
      )
      .subscribe((response: any) => {
        this.searchBooks = response.items;
      });
  }
}
