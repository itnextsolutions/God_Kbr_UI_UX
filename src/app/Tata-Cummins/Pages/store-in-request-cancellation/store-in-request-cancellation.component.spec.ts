import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInRequestCancellationComponent } from './store-in-request-cancellation.component';

describe('StoreInRequestCancellationComponent', () => {
  let component: StoreInRequestCancellationComponent;
  let fixture: ComponentFixture<StoreInRequestCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreInRequestCancellationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreInRequestCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
