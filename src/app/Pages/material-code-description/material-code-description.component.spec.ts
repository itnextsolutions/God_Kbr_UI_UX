import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCodeDescriptionComponent } from './material-code-description.component';

describe('MaterialCodeDescriptionComponent', () => {
  let component: MaterialCodeDescriptionComponent;
  let fixture: ComponentFixture<MaterialCodeDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialCodeDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialCodeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
