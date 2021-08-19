import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionEnterComponent } from './competition-enter.component';

describe('CompetitionEnterComponent', () => {
  let component: CompetitionEnterComponent;
  let fixture: ComponentFixture<CompetitionEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitionEnterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
