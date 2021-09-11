import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { SportEvent } from 'src/app/model/sport_event.model';

@Component({
  selector: 'app-result-enter',
  templateUrl: './result-enter.component.html',
  styleUrls: ['./result-enter.component.css']
})
export class ResultEnterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sports: Sport[];
  disciplines: Discipline[];
  matches: SportEvent[];

  sport: string;
  discipline: string;
  gender: string;

  save() {

  }
}
