import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCountProcessComponent } from './stock-count-process.component';

describe('StockCountProcessComponent', () => {
  let component: StockCountProcessComponent;
  let fixture: ComponentFixture<StockCountProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockCountProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockCountProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
