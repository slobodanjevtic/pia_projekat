import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationPaticipantsComponent } from './nation-paticipants.component';

describe('NationPaticipantsComponent', () => {
  let component: NationPaticipantsComponent;
  let fixture: ComponentFixture<NationPaticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationPaticipantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationPaticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
