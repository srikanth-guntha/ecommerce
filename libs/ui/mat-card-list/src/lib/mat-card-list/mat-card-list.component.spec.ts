import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardListComponent } from './mat-card-list.component';

describe('MatCardListComponent', () => {
  let component: MatCardListComponent;
  let fixture: ComponentFixture<MatCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
