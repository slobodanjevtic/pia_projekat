import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawFormationComponent } from './draw-formation.component';

describe('DrawFormationComponent', () => {
  let component: DrawFormationComponent;
  let fixture: ComponentFixture<DrawFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawFormationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
