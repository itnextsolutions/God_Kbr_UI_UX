import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInOrderViewComponent } from './store-in-order-view.component';

describe('StoreInOrderViewComponent', () => {
  let component: StoreInOrderViewComponent;
  let fixture: ComponentFixture<StoreInOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreInOrderViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreInOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
