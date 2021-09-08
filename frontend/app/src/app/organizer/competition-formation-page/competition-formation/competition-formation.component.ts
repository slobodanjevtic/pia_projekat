import { Component, OnInit } from '@angular/core';

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
  delegates: Delegate[];
  athletes: Athlete[];

  sport: string;
  discipline: string;
  gender: string;
  delegate: string;

  save() {

  }
}
