import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private httpClient: HttpClient) {}

  getBookInfo(id: string) {
    return this.httpClient.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );
  }
}
