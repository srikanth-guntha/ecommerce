import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { UiMatCardListModule } from '@ecommerce/ui/mat-card-list';
import { SearchComponent } from './search.component';
import { BookService } from '@ecommerce/shared/services';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const BookServiceMock = {
    getBooksBySearch(searchString: string) {
      return of({ items: [{ id: '1' }] });
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        SharedMaterialModule,
        UiMatCardListModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: BookService,
          useValue: BookServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' should spyon showBooksBySearch', () => {
    const showBooksBySearchSpy = jest.spyOn(component, 'showBooksBySearch');
    component.ngOnInit();
    expect(showBooksBySearchSpy).toHaveBeenCalled();
  });

  it('it should call getBooksBysearch', fakeAsync(() => {
    const getBooksBySearchSpy = jest.spyOn(BookServiceMock, 'getBooksBySearch');
    component.searchString.setValue('a');
    tick(500);
    expect(getBooksBySearchSpy).toBeCalled();
  }));
});
