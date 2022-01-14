import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShieldsWidgetComponent } from './shields-widget.component';

describe('ShieldsWidgetComponent', () => {
  let component: ShieldsWidgetComponent;
  let fixture: ComponentFixture<ShieldsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShieldsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShieldsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
