import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { User } from 'src/app/model/user.model';
import { Athlete } from 'src/app/model/athlete.model';

@Component({
  selector: 'app-competition-formation',
  templateUrl: './competition-formation.component.html',
  styleUrls: ['./competition-formation.component.css']
})
export class CompetitionFormationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sports: Sport[];
  disciplines: Discipline[];
  delegates: User[];
  athletes: Athlete[];

  sport: string;
  discipline: string;
  gender: string;
  delegate: string;

  save() {

  }
}
