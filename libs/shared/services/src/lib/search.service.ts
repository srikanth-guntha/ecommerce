import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class searchService {
  constructor(private httpClient: HttpClient) {}

  getBooksBySearch(searchString: string) {
    if (searchString == '') {
      return of([]);
    } else {
      return this.httpClient.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchString}`
      );
    }
  }
}
