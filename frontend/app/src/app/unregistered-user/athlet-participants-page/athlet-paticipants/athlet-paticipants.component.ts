import { Component, OnInit } from '@angular/core';
import { Athlete } from 'src/app/model/athlete.model';
import { Nation } from 'src/app/model/nation.model';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';

@Component({
  selector: 'app-athlet-paticipants',
  templateUrl: './athlet-paticipants.component.html',
  styleUrls: ['./athlet-paticipants.component.css']
})
export class AthletPaticipantsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  athlets: Athlete[];
  nations: Nation[];
  sports: Sport[];
  disciplines: Discipline[];

  name: string;
  nation: string;
  sport: string;
  discipline: string;
  gender: string;
  onlyMedalists: boolean;

  search() {

  }
}
