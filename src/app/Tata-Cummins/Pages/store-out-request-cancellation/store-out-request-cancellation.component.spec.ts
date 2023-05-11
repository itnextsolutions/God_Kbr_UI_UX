import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOutRequestCancellationComponent } from './store-out-request-cancellation.component';

describe('StoreOutRequestCancellationComponent', () => {
  let component: StoreOutRequestCancellationComponent;
  let fixture: ComponentFixture<StoreOutRequestCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOutRequestCancellationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreOutRequestCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
