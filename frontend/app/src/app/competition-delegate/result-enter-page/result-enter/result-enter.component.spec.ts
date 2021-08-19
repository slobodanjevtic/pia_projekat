import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultEnterComponent } from './result-enter.component';

describe('ResultEnterComponent', () => {
  let component: ResultEnterComponent;
  let fixture: ComponentFixture<ResultEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultEnterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
