import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { Observable, of } from 'rxjs';
import { BadgeService } from '@ecommerce/shared/services';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let domHelper: DomHelper;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        SharedMaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'search', component: DummyComponent },
        ]),
      ],
      providers: [{ provide: BadgeService, useClass: BadgeServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    domHelper = new DomHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('nav list length', () => {
    expect(component.navList.length).toBe(3);
  });

  it('call displayNavList method on load', () => {
    const displayNavListSpy = jest.spyOn(component, 'displayNavList');
    component.displayNavList();
    expect(displayNavListSpy).toBeCalled();
  });

  it('should contain 3 menu items', () => {
    const MenuItems = fixture.debugElement.queryAll(By.css('a'));
    expect(MenuItems.length).toBe(3);
  });

  it('should be search as first menu item ', () => {
    //  const menuItems = fixture.debugElement.queryAll(By.css('a'));
    const textContent = domHelper.getText('a');
    expect(textContent).toBe('search');
  });

  it('should show one navigation menu item', () => {
    component.navList = ['cartItems'];
    fixture.detectChanges();
    const Elements = domHelper.getElements('a');
    expect(Elements.length).toBe(1);
    const anchorEleText = domHelper.getText('a');
    expect(anchorEleText).toBe('cartItems');
  });
});

class DummyComponent {}

class BadgeServiceStub {
  onMessage(): Observable<{ number: number }> {
    return of({ number: 2 });
  }
}

class DomHelper {
  private fixture: ComponentFixture<NavbarComponent>;
  constructor(fixture: ComponentFixture<NavbarComponent>) {
    this.fixture = fixture;
  }

  getText(tagName: string) {
    const Ele = this.fixture.debugElement.queryAll(By.css(tagName));
    if (Ele) {
      return Ele[0].nativeElement.textContent;
    }
  }

  getElements(tagName: string) {
    return this.fixture.debugElement.queryAll(By.css(tagName));
  }
}
