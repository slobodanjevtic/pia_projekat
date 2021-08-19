import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineAthletsComponent } from './discipline-athlets.component';

describe('DisciplineAthletsComponent', () => {
  let component: DisciplineAthletsComponent;
  let fixture: ComponentFixture<DisciplineAthletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisciplineAthletsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisciplineAthletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
