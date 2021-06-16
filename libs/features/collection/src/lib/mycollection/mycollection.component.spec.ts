import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMatCardListModule } from '@ecommerce/ui/mat-card-list';
import { RouterTestingModule } from '@angular/router/testing';
import { MycollectionComponent } from './mycollection.component';

describe('MycollectionComponent', () => {
  let component: MycollectionComponent;
  let fixture: ComponentFixture<MycollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MycollectionComponent],
      imports: [UiMatCardListModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showCollection method', () => {
    const showCollectionSpy = jest.spyOn(component, 'showCollection');
    component.ngOnInit();
    expect(showCollectionSpy).toHaveBeenCalled();
  });
});
