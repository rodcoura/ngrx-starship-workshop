import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetastatsWidgetComponent } from './metastats-widget.component';

describe('MetastatsWidgetComponent', () => {
  let component: MetastatsWidgetComponent;
  let fixture: ComponentFixture<MetastatsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetastatsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetastatsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
