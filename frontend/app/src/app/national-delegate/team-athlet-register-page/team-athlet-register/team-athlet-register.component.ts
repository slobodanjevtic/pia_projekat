import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { Athlete } from 'src/app/model/athlete.model';

@Component({
  selector: 'app-team-athlet-register',
  templateUrl: './team-athlet-register.component.html',
  styleUrls: ['./team-athlet-register.component.css']
})
export class TeamAthletRegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sports: Sport[];
  disciplines: Discipline[];
  athletes: Athlete[];

  sport: string;
  discipline: string;
  gender: string;
  name: string;
  surname: string;

  addAthlete() {

  }

  uploadFile() {

  }

  removeAthlete(athlete: Athlete) {

  }
}
