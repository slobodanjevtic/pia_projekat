import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';

@Component({
  selector: 'app-draw-formation',
  templateUrl: './draw-formation.component.html',
  styleUrls: ['./draw-formation.component.css']
})
export class DrawFormationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sports: Sport[];
  disciplines: Discipline[];

  sport: string;
  discipline: string;
  gender: string;

  generateDraw() {

  }
}
