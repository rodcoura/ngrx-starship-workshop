import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleRowComponent } from './console-row.component';

describe('ConsoleRowComponent', () => {
  let component: ConsoleRowComponent;
  let fixture: ComponentFixture<ConsoleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsoleRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
