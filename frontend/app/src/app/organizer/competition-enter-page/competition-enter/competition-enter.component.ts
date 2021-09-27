import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { EventLocation } from 'src/app/model/event_location.model';
import { Competition } from 'src/app/model/competition.model';
import { SportService } from 'src/app/service/sport.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { CompetitionService } from 'src/app/service/competition.service';

@Component({
  selector: 'app-competition-enter',
  templateUrl: './competition-enter.component.html',
  styleUrls: ['./competition-enter.component.css']
})
export class CompetitionEnterComponent implements OnInit {

  constructor(private sportService: SportService, private competitionService: CompetitionService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user != null && this.user.type === "organizer") {
      this.getAllSports();
      this.getAllDisciplines();
      this.getLocations();
      this.getCompetitions();
    }
    else {
      this.router.navigate(['/']);
    }
  }

  user: User;

  sports: Sport[];
  disciplines: Discipline[];
  locations: EventLocation[];
  competitions: Competition[];

  sport: string;
  discipline: Discipline;
  gender: string;
  startDate: string;
  endDate: string;
  location: string;
  format: number;

  errorMessage: string;

  addCompetition() {
    if(this.sport == null || this.discipline == null || this.gender == null ||
       this.startDate == null || this.endDate == null || this.location == null || this.format == null ||
       this.discipline.status == 0) {
        this.errorMessage = "You have to set all data";
      }
      else {
        this.competitionService.insertCompetition(this.discipline.name, this.gender,
                                                  this.startDate, this.endDate,
                                                  this.location, this.format).subscribe((res) => {
            console.log(res);
            if(res['message'] == 'OK') {
              this.getCompetitions();
              this.errorMessage = null;
            }
        });
      }
  }

  getAllSports() {
    this.sportService.getAllSports().subscribe((spr: Sport[]) => {
      this.sports = spr;
      this.sport = this.sports[0].name;
    })
  }

  getAllDisciplines() {
    this.sportService.getAllDisciplines().subscribe((dis: Discipline[]) => {
      this.disciplines = dis;
      this.selectFirstDiscipline();
    })
  }

  selectFirstDiscipline() {
    for (let i = 0; i < this.disciplines.length; i++) {
      const d = this.disciplines[i];
      if(d.sport == this.sport) {
        this.discipline = d;
        break;
      }
    }
  }

  getLocations() {
    this.competitionService.getLocations().subscribe((loc: EventLocation[]) => {
      this.locations = loc;
      this.location = this.locations[0].name;
    })
  }

  getCompetitions() {
    this.competitionService.getCompetitions().subscribe((comp: Competition[]) => {
      this.competitions = comp;
      console.log(this.competitions);
    })
  }

}
