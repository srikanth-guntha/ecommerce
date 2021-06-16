import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BillingComponent } from './billing.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedDialogModule } from '@ecommerce/shared/dialog';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { localStorageMock, bookInfo } from '@ecommerce/shared/services';

const ActivatedRouteStub = {
  snapshot: {
    queryParamMap: {
      get: () => {
        return JSON.stringify(bookInfo);
      },
    },
  },
};

describe('BillingComponent', () => {
  let component: BillingComponent;
  let fixture: ComponentFixture<BillingComponent>;
  let matDialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        // HttpClientTestingModule,
        SharedDialogModule,
        SharedMaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [
        MatDialog,
        {
          provide: ActivatedRoute,
          useValue: ActivatedRouteStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorage.clear();
    fixture = TestBed.createComponent(BillingComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on load billing form should be invalid ', () => {
    expect(component.billingForm.controls.name.value).toBe('');
    expect(component.billingForm.controls.email.value).toBe('');
    expect(component.billingForm.controls.phone.value).toBe('');
    expect(component.billingForm.controls.address.value).toBe('');
    expect(component.billingForm.valid).toBeFalsy();
  });

  it(' billing form should be valid if user enters details ', () => {
    component.billingForm.controls.name.setValue('abc');
    component.billingForm.controls.email.setValue('abc@gmail.com');
    component.billingForm.controls.phone.setValue('234');
    component.billingForm.controls.address.setValue('hyderabad');
    expect(component.billingForm.controls.name.value).toBe('abc');
    expect(component.billingForm.controls.email.value).toBe('abc@gmail.com');
    expect(component.billingForm.controls.phone.value).toBe('234');
    expect(component.billingForm.controls.address.value).toBe('hyderabad');
    expect(component.billingForm.valid).toBeTruthy();
  });

  it(' submit should call if billing form is valid ', () => {
    spyOn(component, 'submit');
    component.billingForm.controls.name.setValue('abc');
    component.billingForm.controls.email.setValue('abc@gmail.com');
    component.billingForm.controls.phone.setValue('234');
    component.billingForm.controls.address.setValue('hyderabad');
    fixture.detectChanges();
    const buttonEle = fixture.debugElement.query(By.css('#submit-button'));
    buttonEle.nativeElement.click();
    expect(component.submit).toHaveBeenCalled();
    //expect(component.booksCollection.length).toBe(1);
  });

  it(' should spy matdialog open ', () => {
    spyOn(matDialog, 'open').and.callThrough();
    component.billingForm.controls.name.setValue('abc');
    component.billingForm.controls.email.setValue('abc@gmail.com');
    component.billingForm.controls.phone.setValue('234');
    component.billingForm.controls.address.setValue('hyderabad');
    fixture.detectChanges();
    const buttonEle = fixture.debugElement.query(By.css('#submit-button'));
    buttonEle.nativeElement.click();
    expect(matDialog.open).toHaveBeenCalled();
  });
});
