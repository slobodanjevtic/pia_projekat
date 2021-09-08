import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-athlet-paticipants',
  templateUrl: './athlet-paticipants.component.html',
  styleUrls: ['./athlet-paticipants.component.css']
})
export class AthletPaticipantsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  athlets: Athlet[];
  nations: Nation[];
  sports: Sport[];
  disciplines: SportDiscipline[];

  name: string;
  nation: string;
  sport: string;
  discipline: string;
  gender: string;
  onlyMedalists: boolean;

  search() {

  }
}
