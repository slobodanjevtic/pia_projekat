import { Component, OnInit } from '@angular/core';
import { Athlete } from 'src/app/model/athlete.model';
import { Nation } from 'src/app/model/nation.model';
import { Sport } from 'src/app/model/sport.model';
import { AthleteService } from 'src/app/service/athlete.service';
import { Router } from '@angular/router';
import { NationService } from 'src/app/service/nation.service';
import { SportService } from 'src/app/service/sport.service';

@Component({
  selector: 'app-athlet-paticipants',
  templateUrl: './athlet-paticipants.component.html',
  styleUrls: ['./athlet-paticipants.component.css']
})
export class AthletPaticipantsComponent implements OnInit {

  constructor(private athleteService: AthleteService, private nationService: NationService,
              private sportService: SportService, private router: Router) { }

  ngOnInit(): void {
    this.getAllNations();
    this.getAllSports();
    this.getAllAthletesWithMedals();
  }

  athlets: Athlete[];
  athletsToShow: Athlete[];
  nations: Nation[];
  sports: Sport[];

  name: string;
  nation: string = "all";
  sport: string = "all";
  gender: string;
  onlyMedalists: boolean;

  curPage: number = 1;
  numOfPages: number = 1;
  minIndex: number = 0;
  maxIndex: number = 20;
  numToShow: number = 20;
  j: number = 0;

  search() {
    console.log(this.name, this.nation, this.sport, this.gender, this.onlyMedalists);
    this.athletsToShow = [];
    this.athlets.forEach(ath => {
      if((ath.name.includes(this.name) || ath.surname.includes(this.name) || this.name == null || this.name == '') &&
          (ath.sport == this.sport || this.sport == 'all') &&
          (ath.nation == this.nation || this.nation == 'all') &&
          (ath.gender == this.gender || this.gender == null) &&
          ((this.onlyMedalists && (ath.gold+ath.silver+ath.bronze) > 0) || !this.onlyMedalists)) {
              ath.show = true;
              this.athletsToShow.push(ath);
      }
      else {
        ath.show = false;
      }
    });
    this.setPagination();
    this.curPage = 1;
    console.log(this.athlets);
  }

  getAllAthletesWithMedals() {
    this.athleteService.getAllAthletesWithMedals().subscribe((ath: Athlete[]) => {
      this.athlets = ath;
      this.athlets.forEach(a => {
        a.show = true;
      });
      console.log(this.athlets);
      this.athletsToShow = this.athlets;
      this.setPagination();
      this.curPage = 1;
    })
  }

  setPagination(){
    this.numOfPages = 0;
    for (let i = 0; i < this.athletsToShow.length; i+=this.numToShow) {
      this.numOfPages++;
    }
    this.minIndex = 0;
    this.maxIndex = this.numToShow;
  }

  getAllNations() {
    this.nationService.getAllNations().subscribe((nat: Nation[]) => {
      this.nations = nat;
    })
  }

  getAllSports() {
    this.sportService.getAllSports().subscribe((spo: Sport[]) => {
      this.sports = spo;
    })
  }

  next() {
    if(this.athletsToShow.length > this.maxIndex) {
      this.curPage++;
      this.minIndex += this.numToShow;
      this.maxIndex += this.numToShow;
    }
  }

  prev() {
    if(this.minIndex > 0) {
      this.curPage--;
      this.minIndex -= this.numToShow;
      this.maxIndex -= this.numToShow;
    }
  }
}
