import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportAthletsComponent } from './sport-athlets.component';

describe('SportAthletsComponent', () => {
  let component: SportAthletsComponent;
  let fixture: ComponentFixture<SportAthletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportAthletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportAthletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
