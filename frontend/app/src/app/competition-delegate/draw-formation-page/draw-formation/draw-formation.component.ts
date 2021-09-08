import { Component, OnInit } from '@angular/core';

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
  disciplines: Dicipline[];

  sport: string;
  discipline: string;
  gender: string;

  generateDraw() {

  }
}
