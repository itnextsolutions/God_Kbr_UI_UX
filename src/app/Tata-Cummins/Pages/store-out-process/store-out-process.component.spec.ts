import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreOutProcessComponent } from './store-out-process.component';

describe('StoreOutProcessComponent', () => {
  let component: StoreOutProcessComponent;
  let fixture: ComponentFixture<StoreOutProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreOutProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreOutProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
