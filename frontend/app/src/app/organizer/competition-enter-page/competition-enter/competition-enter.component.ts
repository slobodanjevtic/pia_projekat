import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-competition-enter',
  templateUrl: './competition-enter.component.html',
  styleUrls: ['./competition-enter.component.css']
})
export class CompetitionEnterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sports: Sport[];
  disciplines: Discipline[];
  locations: EventLocation[];
  competitions: Competition[];

  sport: string;
  discipline: string;
  gender: string;
  startDate: Date;
  endDate: Date;
  location: string;

  addCompetition() {

  }

}
