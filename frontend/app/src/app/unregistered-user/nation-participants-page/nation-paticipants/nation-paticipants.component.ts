import { Component, OnInit } from '@angular/core';
import { Nation } from 'src/app/model/nation.model';
import { NationService } from 'src/app/service/nation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nation-paticipants',
  templateUrl: './nation-paticipants.component.html',
  styleUrls: ['./nation-paticipants.component.css']
})
export class NationPaticipantsComponent implements OnInit {

  constructor(private nationService: NationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllNations();
  }

  nations: Nation[];

  getAllNations() {
    this.nationService.getNationsWithAthletes().subscribe((nat: Nation[]) => {
      this.nations = nat;
    })
  }
}
