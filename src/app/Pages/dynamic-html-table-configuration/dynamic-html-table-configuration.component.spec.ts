import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicHtmlTableConfigurationComponent } from './dynamic-html-table-configuration.component';

describe('DynamicHtmlTableConfigurationComponent', () => {
  let component: DynamicHtmlTableConfigurationComponent;
  let fixture: ComponentFixture<DynamicHtmlTableConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicHtmlTableConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicHtmlTableConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
