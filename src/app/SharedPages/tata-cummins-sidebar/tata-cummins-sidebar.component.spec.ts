import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TataCumminsSidebarComponent } from './tata-cummins-sidebar.component';

describe('TataCumminsSidebarComponent', () => {
  let component: TataCumminsSidebarComponent;
  let fixture: ComponentFixture<TataCumminsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TataCumminsSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TataCumminsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
