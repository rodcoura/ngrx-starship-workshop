import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewscreenComponent } from './viewscreen.component';

describe('ViewscreenComponent', () => {
  let component: ViewscreenComponent;
  let fixture: ComponentFixture<ViewscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
