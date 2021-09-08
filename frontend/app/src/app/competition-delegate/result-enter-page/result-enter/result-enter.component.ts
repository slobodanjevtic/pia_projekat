import { Component, OnInit } from '@angular/core';

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
  matches: Match[];

  sport: string;
  discipline: string;
  gender: string;

  save() {

  }
}
