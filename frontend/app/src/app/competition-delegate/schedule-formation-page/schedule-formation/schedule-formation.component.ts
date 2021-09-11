import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { EventLocation } from 'src/app/model/event_location.model';
import { SportEvent } from 'src/app/model/sport_event.model';

@Component({
  selector: 'app-schedule-formation',
  templateUrl: './schedule-formation.component.html',
  styleUrls: ['./schedule-formation.component.css']
})
export class ScheduleFormationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sports: Sport[];
  disciplines: Discipline[];
  matches: SportEvent[];
  locations: EventLocation[];

  sport: string;
  discipline: string;
  gender: string;
  location: string;

  save() {

  }
}
