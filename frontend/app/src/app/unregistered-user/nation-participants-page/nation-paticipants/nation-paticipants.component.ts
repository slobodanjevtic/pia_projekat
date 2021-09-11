import { Component, OnInit } from '@angular/core';
import { Nation } from 'src/app/model/nation.model';

@Component({
  selector: 'app-nation-paticipants',
  templateUrl: './nation-paticipants.component.html',
  styleUrls: ['./nation-paticipants.component.css']
})
export class NationPaticipantsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  nations: Nation[];
}
