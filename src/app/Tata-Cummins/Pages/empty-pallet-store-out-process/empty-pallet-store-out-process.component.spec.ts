import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPalletStoreOutProcessComponent } from './empty-pallet-store-out-process.component';

describe('EmptyPalletStoreOutProcessComponent', () => {
  let component: EmptyPalletStoreOutProcessComponent;
  let fixture: ComponentFixture<EmptyPalletStoreOutProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyPalletStoreOutProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyPalletStoreOutProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
