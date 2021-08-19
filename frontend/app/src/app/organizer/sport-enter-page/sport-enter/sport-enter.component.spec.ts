import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportEnterComponent } from './sport-enter.component';

describe('SportEnterComponent', () => {
  let component: SportEnterComponent;
  let fixture: ComponentFixture<SportEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportEnterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
