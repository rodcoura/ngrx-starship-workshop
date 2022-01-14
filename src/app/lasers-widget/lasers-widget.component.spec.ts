import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LasersWidgetComponent } from './lasers-widget.component';

describe('LasersWidgetComponent', () => {
  let component: LasersWidgetComponent;
  let fixture: ComponentFixture<LasersWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LasersWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LasersWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
