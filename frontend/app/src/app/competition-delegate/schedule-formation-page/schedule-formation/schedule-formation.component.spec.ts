import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleFormationComponent } from './schedule-formation.component';

describe('ScheduleFormationComponent', () => {
  let component: ScheduleFormationComponent;
  let fixture: ComponentFixture<ScheduleFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
