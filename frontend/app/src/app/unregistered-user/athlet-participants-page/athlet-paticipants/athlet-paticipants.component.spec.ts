import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletPaticipantsComponent } from './athlet-paticipants.component';

describe('AthletPaticipantsComponent', () => {
  let component: AthletPaticipantsComponent;
  let fixture: ComponentFixture<AthletPaticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthletPaticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthletPaticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
