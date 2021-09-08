import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sport-enter',
  templateUrl: './sport-enter.component.html',
  styleUrls: ['./sport-enter.component.css']
})
export class SportEnterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sports: Sport[];
  disciplines: Discipline[];

  sport: string;
  discipline: string;

  enterSport() {

  }

}
