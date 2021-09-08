import { Component, OnInit } from '@angular/core';

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
  matches: Match[];
  locations: EventLocation[];

  sport: string;
  discipline: string;
  gender: string;
  location: string;

  save() {

  }
}
