import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPalletInProcessComponent } from './empty-pallet-in-process.component';

describe('EmptyPalletInProcessComponent', () => {
  let component: EmptyPalletInProcessComponent;
  let fixture: ComponentFixture<EmptyPalletInProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyPalletInProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyPalletInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
