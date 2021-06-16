import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BadgeService } from '@ecommerce/shared/services';
import { UiMatCardListModule } from '@ecommerce/ui/mat-card-list';
import { CartComponent } from './cart.component';
import { data } from './data';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { localStorageMock } from '@ecommerce/shared/services';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let location: Location;
  const BadgeServiceMock = {
    sendMessage(badgeNumber: number) {
      return;
    },
  };
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [RouterTestingModule, UiMatCardListModule],
      providers: [
        { provide: BadgeService, useValue: BadgeServiceMock },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorage.clear();
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should spy displayCartItems', () => {
    const displayCartItemsSpy = jest.spyOn(component, 'displayCartItems');
    component.ngOnInit();
    expect(displayCartItemsSpy).toHaveBeenCalled();
  });

  it('cart Items length should be 10 ', () => {
    localStorage.setItem('cart', JSON.stringify(data));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.cartItems.length).toBe(10);
  });
  it('should call deleteCartItems and cart length should be 9', () => {
    localStorage.setItem('cart', JSON.stringify(data));
    component.ngOnInit();
    const sendMessageSpy = jest.spyOn(BadgeServiceMock, 'sendMessage');
    fixture.detectChanges();
    const Element = fixture.debugElement.query(By.css('.delete-button'));
    Element.nativeElement.click();
    expect(sendMessageSpy).toHaveBeenCalled();
    expect(component.cartItems.length).toBe(9);
  });

  it('proceed to purchase should spy when clicked in proceed to purchase button', () => {
    localStorage.setItem('cart', JSON.stringify(data));
    component.ngOnInit();
    fixture.detectChanges();
    const proceedToPurchaseSpy = jest.spyOn(component, 'proceedToPurchase');
    const Element = fixture.debugElement.query(By.css('.buy-button'));
    Element.nativeElement.click();
    expect(proceedToPurchaseSpy).toHaveBeenCalled();
  });
});
