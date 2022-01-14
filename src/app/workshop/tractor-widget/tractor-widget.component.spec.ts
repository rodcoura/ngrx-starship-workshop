import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TractorWidgetComponent } from './tractor-widget.component';

describe('LaserWidgetComponent', () => {
  let component: TractorWidgetComponent;
  let fixture: ComponentFixture<TractorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TractorWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TractorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
