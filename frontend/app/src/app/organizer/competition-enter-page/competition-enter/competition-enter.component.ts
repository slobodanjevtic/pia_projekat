import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { EventLocation } from 'src/app/model/event_location.model';
import { Competition } from 'src/app/model/competition.model';

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
