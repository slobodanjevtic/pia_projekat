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
  sortedParticipantes: Participating[] = [];
  repeatAthletes: Athlete[] = [];
  competition: Competition;
  resultFormat: string;

  errorMessage: string;
  numOfSeries: number[] = [];

  setRegex() {

    this.regexText.set("^\\d\\d,\\d\\d$", "SS,TT");
    this.regexText.set("^\\d\\d:\\d\\d,\\d\\d$", "MM:SS,TT");
    this.regexText.set("^\\d\\d:\\d\\d:\\d\\d$", "HH:MM:SS");
    this.regexText.set("^\\d,\\d\\d$", "M,CM");
    this.regexText.set("^\\d\\d,\\d\\d$", "MM,CM");
    this.regexText.set("^\\d\\d\\d\.\\d$", "DDD.D");
    this.regexText.set("^\\d$", "D");

  }

  save() {
    if(this.competition.status == 2) {
      this.errorMessage = "This competition is finished";
    }
    else {

      if(this.areResultsGood()) {
        if(this.getSeriesDone() == this.numOfSeries.length) {
          this.setPlaces();
        }
        console.log(this.participantes);
        this.sportEventService.setResults(this.participantes, this.getSeriesDone() == this.numOfSeries.length).subscribe((res) => {
          if(res['message'] == 'OK') {
            this.getAllCompetitionsForDelegate();
          }
          else {
            this.errorMessage = "Something went wrong";
          }
        })
        this.errorMessage = null;
      }
      else {
        this.errorMessage = "Results must be entered in right format";
      }

    }

  }

  checkWinners() {
    let group = new Array<number>();
    let par1: Participating;
    let par2: Participating;

    for (let i = 0; i < this.participantes.length; i+=2) {
      par1 = this.participantes[i];
      par2 = this.participantes[i+1];
      if(par1.result[0] > par2.result[0]) {
        group.push(par1.idAthlete);
      }
      else {
        group.push(par2.idAthlete);

      }
    }

  }

  sortByResult() {
    this.sortedParticipantes = this.participantes;
    this.sortedParticipantes.sort((a, b) => {
      if(a.result[0] > b.result[0]) return 1;
      if(a.result[0] < b.result[0]) return -1;
      return 0;
    });
  }

  sortResultsForParticipant() {
    this.sortedParticipantes = this.participantes;
    this.sortedParticipantes.forEach(par => {
      par.result.sort((a, b) => {
        if(a < b) return 1;
        if(a > b) return -1;
        return 0;
      });
    });
  }

  sortResultsBySum() {
    this.sortedParticipantes = this.participantes;
    this.sortedParticipantes.sort((a, b) => {
      let aSum = this.getSum(a.result);
      let bSum = this.getSum(b.result);
      if(aSum < bSum) return 1;
      if(aSum > bSum) return -1;
      return 0;
    })
  }

  getSum(arr: Array<string>) : string {
    var sum: number = 0.0;
    arr.forEach(elem => {
      if(elem != null) {
        sum += parseFloat(elem);
      }
    });
    console.log(sum);
    return sum.toString();
  }


  areResultsGood() : boolean {

    var regex: RegExp;
    regex = new RegExp(this.competition.resultFormat);
    console.log(regex);

    for (let i = 0; i < this.participantes.length; i++) {
      const par = this.participantes[i];
      for (let j = 0; j < this.getSeriesDone(); j++) {
        const res = par.result[j];
        if(res != null) {
          if(!regex.test(res)) {
            return false;
          }
        }
      }
    }

    return true;
  }

  getMax(arr: Array<string>) : string {
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
      const a = arr[i];
      if(a > max) {
        max = a
      }
    }
    return max;
  }

  getMin(arr: Array<string>) : string {
    let min = arr[0];

    for (let i = 1; i < arr.length; i++) {
      const a = arr[i];
      if(a < min) {
        min = a
      }
    }
    return min;
  }

  setPlaces() {
    let gold: string;
    let silver: string;
    let bronze: string;

    if (parseInt(this.competition.format) == 1) {
      //this.sortResultsForParticipant();
      //this.sortByResult();

      gold = this.participantes[0].result[0];
      silver = this.participantes[0].result[0];
      bronze = this.participantes[0].result[0];

      for (let i = 1; i < this.participantes.length; i++) {
        const par = this.participantes[i];
        par.score = par.result[0];
        if(par.score < gold) {
          gold = par.score;
        }
        else if(par.score < silver) {
          silver = par.score;
        }
        else if(par.score < bronze) {
          bronze = par.score;
        }
      }

    }
    else if(parseInt(this.competition.format) == 2) {
      //this.sortResultsBySum();
      gold = this.getMax(this.participantes[0].result);
      silver = this.getMax(this.participantes[0].result);
      bronze = this.getMax(this.participantes[0].result);

      for (let i = 1; i < this.participantes.length; i++) {
        const par = this.participantes[i];
        par.score = this.getMax(par.result);
        if(par.score > gold) {
          gold = par.score;
        }
        else if(par.score > silver) {
          silver = par.score;
        }
        else if(par.score > bronze) {
          bronze = par.score;
        }
      }

    }
    else if(parseInt(this.competition.format) == 3) {
      gold = this.getSum(this.participantes[0].result);
      silver = this.getSum(this.participantes[0].result);
      bronze = this.getSum(this.participantes[0].result);

      for (let i = 1; i < this.participantes.length; i++) {
        const par = this.participantes[i];
        par.score = this.getSum(par.result);
        if(par.score > gold) {
          gold = par.score;
        }
        else if(par.score > silver) {
          silver = par.score;
        }
        else if(par.score > bronze) {
          bronze = par.score;
        }
      }
    }

    this.participantes.forEach(par => {
      if(par.score == gold) {
        par.place = 1;
      }
      else if(par.score == silver) {
        par.place = 2;
      }
      else if(par.score == bronze) {
        par.place = 3;
      }
    });

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
        this.sportEventService.insertParticipating(this.competition.id, group, ath1.round + 1, 1).subscribe((res) => {
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

  getSeriesDone() : number {

    for (let i = 0; i < this.numOfSeries.length; i++) {
      const ser = this.numOfSeries[i];
      for (let j = 0; j < this.participantes.length; j++) {
        const par = this.participantes[j];
        if(par.result[i] == null || par.result[i] == '') {
          return i;
        }
      }
    }

    return this.numOfSeries.length;
  }


  getAllParticipants() {
    console.log(this.competition.id);
    this.sportEventService.getAllReadyEvents(this.competition.id).subscribe((par: Participating[]) => {
      this.participantes = par;
      this.numOfSeries = [];
      if(par != null) {
        for (let i = 0; i < par[0].series; i++) {
          this.numOfSeries.push(i);
        }
      }

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
    })
  }
}
