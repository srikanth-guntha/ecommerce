import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Book } from './book';
import { BookService } from './book.service';
import { bookInfo } from './test-util';

describe('BookService', () => {
  let service: BookService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BookService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  it('Should call api request', () => {
    let result: Book = {
      id: '12',
    };
    service.getBookInfo('2').subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}/2`,
    });

    req.flush(bookInfo);
    expect(result).toEqual(bookInfo);
  });

  it('Should call api request if the query params are given', () => {
    let result: Book[] = [];
    service.getBooksBySearch('ang').subscribe((data) => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${baseUrl}?q=ang`,
    });
    req.flush({ items: [bookInfo] });
    expect(result).toEqual([bookInfo]);
  });

  it('Should call api request if the query params with empty string', () => {
    let result: Book[] = [
      {
        id: '1',
      },
    ];
    service.getBooksBySearch('').subscribe((data) => {
      result = data;
    });
    expect(result).toEqual([]);
  });
});
