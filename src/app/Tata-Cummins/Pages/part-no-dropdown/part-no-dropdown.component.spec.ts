import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartNoDropdownComponent } from './part-no-dropdown.component';

describe('PartNoDropdownComponent', () => {
  let component: PartNoDropdownComponent;
  let fixture: ComponentFixture<PartNoDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartNoDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartNoDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
