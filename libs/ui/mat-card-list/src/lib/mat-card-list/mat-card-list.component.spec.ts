import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { bookInfo } from '@ecommerce/shared/services';
import { MatCardListComponent } from './mat-card-list.component';

const event = {
  stopImmediatePropagation: () => {
    return;
  },
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

describe('MatCardListComponent', () => {
  let component: MatCardListComponent;
  let fixture: ComponentFixture<MatCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatCardListComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deleteBook defined', () => {
    expect(component.deleteBook).toBeDefined();
  });

  it('should spy on stopImmediatePropagation', () => {
    spyOn(event, 'stopImmediatePropagation');
    component.delete(event, bookInfo);
    expect(event.stopImmediatePropagation).toHaveBeenCalled();
  });

  it('should spy on emit of deleteDook', () => {
    spyOn(component.deleteBook, 'emit');
    component.delete(event, bookInfo);
    expect(component.deleteBook.emit).toHaveBeenCalled();
  });

  it('should spy on naviage of router', () => {
    component.showBookInfo(bookInfo);
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalled();
  });

  it('trackBy should return string', () => {
    fixture.detectChanges();
    expect(component.trackByFn(1, bookInfo)).toBe('angular');
  });
});
