import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorMatCodeDescriptionComponent } from './vendor-mat-code-description.component';

describe('VendorMatCodeDescriptionComponent', () => {
  let component: VendorMatCodeDescriptionComponent;
  let fixture: ComponentFixture<VendorMatCodeDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorMatCodeDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorMatCodeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
