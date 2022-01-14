import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DockingClampWidgetComponent } from './docking-clamp-widget.component';

describe('DockingClampWidgetComponent', () => {
  let component: DockingClampWidgetComponent;
  let fixture: ComponentFixture<DockingClampWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DockingClampWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DockingClampWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
