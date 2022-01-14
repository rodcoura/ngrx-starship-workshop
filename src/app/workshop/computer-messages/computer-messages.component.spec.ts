import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerMessagesComponent } from './computer-messages.component';

describe('ComputerMessagesComponent', () => {
  let component: ComputerMessagesComponent;
  let fixture: ComponentFixture<ComputerMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
