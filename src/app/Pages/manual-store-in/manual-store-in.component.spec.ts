import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualStoreInComponent } from './manual-store-in.component';

describe('ManualStoreInComponent', () => {
  let component: ManualStoreInComponent;
  let fixture: ComponentFixture<ManualStoreInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualStoreInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualStoreInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
