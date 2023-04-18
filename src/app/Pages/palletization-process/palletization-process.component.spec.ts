import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletizationProcessComponent } from './palletization-process.component';

describe('PalletizationProcessComponent', () => {
  let component: PalletizationProcessComponent;
  let fixture: ComponentFixture<PalletizationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalletizationProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalletizationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
