import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineWidgetComponent } from './engine-widget.component';

describe('EngineWidgetComponent', () => {
  let component: EngineWidgetComponent;
  let fixture: ComponentFixture<EngineWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
