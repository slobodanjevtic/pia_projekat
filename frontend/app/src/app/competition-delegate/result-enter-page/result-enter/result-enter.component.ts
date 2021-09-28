import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { SportEvent } from 'src/app/model/sport_event.model';
import { CompetitionService } from 'src/app/service/competition.service';
import { AthleteService } from 'src/app/service/athlete.service';
import { SportEventService } from 'src/app/service/sport-event.service';
import { Router } from '@angular/router';
import { Competition } from 'src/app/model/competition.model';
import { User } from 'src/app/model/user.model';
import { Athlete } from 'src/app/model/athlete.model';
import { Competing } from 'src/app/model/competing.model';
import { Registered } from 'src/app/model/registered.model';
import { Participating } from 'src/app/model/participating.model';

@Component({
  selector: 'app-result-enter',
  templateUrl: './result-enter.component.html',
  styleUrls: ['./result-enter.component.css']
})
export class ResultEnterComponent implements OnInit {

  constructor(private competitionService: CompetitionService,
              private athleteService: AthleteService, private sportEventService: SportEventService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user != null && this.user.type === "competition_delegate") {
      this.getAllCompetitionsForDelegate();
      this.getAllAthletes();
    }
    else {
      this.router.navigate(['/']);
    }
  }

  user: User;
  competitions: Map<number, Competition> = new Map<number, Competition>();
  athletes: Map<number, Athlete> = new Map<number, Athlete>();

  regexText: Map<string, string> = new Map<string, string>();

  participantes: Participating[] = [];
  repeatAthletes: Athlete[] = [];
  competition: Competition;
  resultFormat: string;

  errorMessage: string;
  seriesDone: number;
  numOfAthletes: number;

  setRegex() {

    this.regexText.set("^\\d\\d,\\d\\d$", "SS,TT");
    this.regexText.set("^\\d\\d:\\d\\d,\\d\\d$", "MM:SS,TT");
    this.regexText.set("^\\d\\d:\\d\\d:\\d\\d$", "HH:MM:SS");
    this.regexText.set("^\\d,\\d\\d$", "M,CM");
    this.regexText.set("^\\d\\d,\\d\\d$", "MM,CM");
    this.regexText.set("^\\d\\d\\d,\\d\\d$", "DDD,D");
    this.regexText.set("^\\d$", "D");

  }

  save() {
    if(this.competition.status == 2) {
      this.errorMessage = "This competition is finished";
    }
    else {
      if(this.areResultsGood(parseInt(this.competition.format))) {
        this.sportEventService.setResults(this.participantes).subscribe((res) => {
          if(res['message'] != 'OK') {
            this.errorMessage = "Something went wrong";
          }
          else {
            this.getAllCompetitionsForDelegate();
          }
        })
        this.errorMessage = null;
      }
      else {
        this.errorMessage = "Results must be entered in right format";
      }

    }


  }

  sortByResult() {
    this.participantes.sort((a, b) => {
      if(a.result[0] > b.result[0]) return 1;
      if(a.result[0] < b.result[0]) return -1;
      return 0;
    });
  }

  areResultsGood(format: number) : boolean {

    var regex: RegExp;
    regex = new RegExp(this.competition.resultFormat);

    for (let i = 0; i < this.participantes.length; i++) {
      const par = this.participantes[i];
      console.log(par.result[0]);
      if(!regex.test(par.result[0])) {
        return false;
      }
    }

    switch (format) {
      case 1:
        this.sortByResult();
        this.setPlaces();
        return true;
      case 2:
        break;
      case 3:
        break;
      case 4:
      case 5:
      case 6:
        break;
      default:
        break;
    }
    return false;
  }

  setPlaces() {
    let ath1: Participating = this.participantes[0];
    ath1.place = 1;
    for (let i = 1; i < this.participantes.length; i++) {
      const ath2 = this.participantes[i];

      if(ath1.result[0] == ath2.result[0]) {
        ath2.place = ath1.place;
      }
      else {
        ath2.place = i+1;
      }

      ath1 = ath2;
    }
  }

  generateNewRounds() {
    let group = new Array<number>();

    let ath1: Participating = this.participantes[0];
    for (let i = 1; i < this.participantes.length; i++) {
      const ath2 = this.participantes[i];

      if(ath1.place == ath2.place) {
        group.push(ath1.id);
      }
      else {
        group.push(ath1.id);
        this.sportEventService.insertParticipating(this.competition.id, group, ath1.round, 1).subscribe((res) => {
          if(res['message'] == 'OK') {

          }
        })
        group = new Array<number>();
      }
      ath1 = ath2;
    }

  }

  getAllCompetitionsForDelegate() {
    this.competitionService.getAllCompetitionsForDelegate(this.user.id).subscribe((comp: Competition[]) => {
      comp.forEach(c => {
        this.competitions.set(c.id, c);
      });
      this.competition = comp[0];
      this.setRegex();

    })
  }


  getAllAthletes() {
    this.athleteService.getAllAthletes().subscribe((ath: Athlete[]) => {
      ath.forEach(a => {
        a.competitions = new Array<number>();
        a.disciplines = new Array<number>();
        this.athletes.set(a.id, a);
      });
      this.competitionService.getAllCompetings().subscribe((comp: Competing[]) => {
        comp.forEach(c => {
          if(this.athletes.has(c.idAthlete)) {
            this.athletes.get(c.idAthlete).competitions.push(c.idCompetition);
            this.athletes.get(c.idAthlete).seed = c.seed;
          }
        });
        this.competitionService.getAllRegistered().subscribe((reg: Registered[]) => {
          reg.forEach(r => {
            if(this.athletes.has(r.idAthlete)) {
              this.athletes.get(r.idAthlete).disciplines.push(r.idDiscipline);
            }
          });
        })
        this.getAllParticipants();
      })
    })
  }

  getSeriesDone() {
    let format: number = 1;
    switch (parseInt(this.competition.format)) {
      case 2:
        format = 3;
        break;
      case 3:
        format = 6;
        break;
      default:
        format = 1;
        break;
    }

    this.numOfAthletes = this.participantes.length / format;

    this.seriesDone = this.participantes.length / this.numOfAthletes;

    for (let i = 0; i < this.participantes.length; i++) {
      const par = this.participantes[i];
      if(par.result == null) {
        this.seriesDone = i / this.numOfAthletes;
        break;
      }
    }
  }

  getAllParticipants() {
    console.log(this.competition.id);
    this.sportEventService.getAllReadyEvents(this.competition.id).subscribe((par: Participating[]) => {
      this.participantes = par;
      this.participantes.forEach(p => {
        if(this.athletes.has(p.idAthlete)) {
          p.athlete = this.athletes.get(p.idAthlete).name + " " + this.athletes.get(p.idAthlete).surname;
        }
      });
      this.participantes.sort((a, b) => {
        if(a.idEvent > b.idEvent) return 1;
        if(a.idEvent < b.idEvent) return -1;
        if(a.round > b.round) return 1;
        if(a.round < b.round) return -1;
        if(a.series > b.series) return 1;
        if(a.series < b.series) return -1;
        if(a.athlete > b.athlete) return 1;
        if(a.athlete < b.athlete) return -1
        return 0;
      });
      console.log(this.participantes);
      this.getSeriesDone();
    })
  }
}
