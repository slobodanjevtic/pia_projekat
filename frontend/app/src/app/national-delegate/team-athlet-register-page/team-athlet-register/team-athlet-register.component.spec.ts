import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAthletRegisterComponent } from './team-athlet-register.component';

describe('TeamAthletRegisterComponent', () => {
  let component: TeamAthletRegisterComponent;
  let fixture: ComponentFixture<TeamAthletRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAthletRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAthletRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
