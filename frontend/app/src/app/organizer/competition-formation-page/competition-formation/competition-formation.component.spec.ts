import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionFormationComponent } from './competition-formation.component';

describe('CompetitionFormationComponent', () => {
  let component: CompetitionFormationComponent;
  let fixture: ComponentFixture<CompetitionFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
