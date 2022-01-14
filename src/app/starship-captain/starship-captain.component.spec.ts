import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipCaptainComponent } from './starship-captain.component';

describe('StarshipCaptainComponent', () => {
  let component: StarshipCaptainComponent;
  let fixture: ComponentFixture<StarshipCaptainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarshipCaptainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipCaptainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
