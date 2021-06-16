import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BadgeService,
  BookService,
  bookInfo,
  localStorageMock,
} from '@ecommerce/shared/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { SharedStarRatingModule } from '@ecommerce/shared/star-rating';
import { BookinfoComponent } from './bookinfo.component';
import { of } from 'rxjs';

const ActivatedRouteStub = {
  snapshot: {
    queryParamMap: {
      get: () => {
        return '12';
      },
    },
  },
};

describe('BookinfoComponent', () => {
  let component: BookinfoComponent;
  let fixture: ComponentFixture<BookinfoComponent>;

  const mockBookService = {
    getBookInfo(num: string) {
      return of({
        id: '1',
        volumeInfo: [],
      });
    },
  };

  const mockBadgeService = {
    sendMessage(num: string) {
      return;
    },
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookinfoComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        RouterModule,
        BrowserAnimationsModule,
        SharedMaterialModule,
        SharedStarRatingModule,
      ],
      providers: [
        { provide: BookService, useValue: mockBookService },
        { provide: BadgeService, useValue: mockBadgeService },
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteStub,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorage.clear();
    fixture = TestBed.createComponent(BookinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBookInfo method', () => {
    expect(component.bookInfo).toEqual({ id: '1', volumeInfo: [] });
  });

  it('should spy sendMessage method', () => {
    jest.spyOn(mockBadgeService, 'sendMessage');
    component.addToCart(bookInfo);
    fixture.detectChanges();
    expect(mockBadgeService.sendMessage).toHaveBeenCalled();
  });

  it('should cart Items Length should be 1 and duplicateBook becomes false', () => {
    component.addToCart(bookInfo);
    fixture.detectChanges();
    expect(component.books.length).toBe(1);
    expect(component.duplicateBook).toBe(false);
  });

  it('should be duplicateBook become false on load', () => {
    expect(component.duplicateBook).toBe(false);
  });

  it('should check duplicate file and duplicateBook become true', () => {
    localStorage.setItem('cart', JSON.stringify([bookInfo]));
    component.addToCart(bookInfo);
    fixture.detectChanges();
    expect(component.duplicateBook).toBe(true);
  });

  it('should spy on naviage of router', () => {
    component.buy(bookInfo);
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });
});
