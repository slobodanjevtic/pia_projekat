import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { CompetitionService } from 'src/app/service/competition.service';
import { SportService } from 'src/app/service/sport.service';
import { AthleteService } from 'src/app/service/athlete.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { Competition } from 'src/app/model/competition.model';
import { Athlete } from 'src/app/model/athlete.model';
import { Competing } from 'src/app/model/competing.model';
import { Registered } from 'src/app/model/registered.model';
import { SportEventService } from 'src/app/service/sport-event.service';
import { Participating } from 'src/app/model/participating.model';

@Component({
  selector: 'app-draw-formation',
  templateUrl: './draw-formation.component.html',
  styleUrls: ['./draw-formation.component.css']
})
export class DrawFormationComponent implements OnInit {

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
  participantes: Participating[] = [];

  competition: Competition;

  group: Array<number>;
  draw: Array<number>;

  errorMessage: string;

  generate() {
    switch (parseInt(this.competition.format)) {
      case 1:
        this.generateGroup(1);
        break;
      case 2:
        this.generateGroup(3);
        break;
      case 3:
        this.generateGroup(6);
        break;
      case 4:
        this.generateDraw(4);
        break;
      case 5:
        this.generateDraw(8);
        break;
      case 6:
        this.generateDraw(16);
        break;
      default:
        break;
    }
  }

  generateGroup(series: number) {
    this.group = new Array<number>();

    console.log(series);

    this.athletes.forEach(ath => {
      if(ath.competitions.includes(this.competition.id)) {
        this.group.push(ath.id);
        if(this.group.length == 8) {
          return;
        }
      }
    });
    this.sportEventService.insertParticipating(this.competition.id, this.group, 1, series).subscribe((res) => {
      if(res['message'] == 'OK') {
        this.getAllParticipants();
      }
    })

  }

  generateDraw(players: number) {
    this.draw = new Array<number>(players);

    this.athletes.forEach(ath => {
      console.log(ath);
      if(ath.competitions.includes(this.competition.id)) {
        switch (ath.seed) {
          case 1:
            this.draw[0] = ath.id;
            break;
          case 2:
            this.draw[players-1] = ath.id;
            break;
          case 3:
          case 4:
            if(players == 4){
              this.setPlayer(1, 2, ath.id);
            }
            else if(players == 8) {
              this.setPlayer(3, 4, ath.id);
            }
            else {
              this.setPlayer(7, 8, ath.id);
            }
            break;
          case 5:
          case 6:
            if(players == 8) {
              this.setPlayer(2, 5, ath.id);
            }
            else {
              this.setPlayer(4, 11, ath.id);
            }
            break;
          case 7:
          case 8:
            if(players == 8) {
              this.setPlayer(1, 6, ath.id);
            }
            else {
              this.setPlayer(3, 12, ath.id);
            }
            break;
          case 9:
          case 10:
            this.setPlayer(2, 13, ath.id);
            break;
          case 11:
          case 12:
            this.setPlayer(5, 10, ath.id);
            break;
          case 13:
          case 14:
            this.setPlayer(6, 9, ath.id);
            break;
          case 15:
          case 16:
            this.setPlayer(1, 14, ath.id);
            break;
          default:
            return;
        }
      }
    });
    console.log(this.competition.id, this.draw);
    this.sportEventService.insertParticipating(this.competition.id, this.draw, 1, 1).subscribe((res) => {
      if(res['message'] == 'OK') {
        this.getAllParticipants();
      }
    })

  }

  setPlayer(n1: number, n2: number, id: number) {
    if(this.draw[n1] != null) {
      this.draw[n2] = id;
    }
    else if(this.draw[n2] != null) {
      this.draw[n1] = id;
    }
    else {
      const r = Math.random() * 2;
      if(r == 0) {
        this.draw[n1] = id;
      }
      else {
        this.draw[n2] = id;
      }
    }
  }

  getAllParticipants() {
    console.log(this.competition.id);
    this.sportEventService.getAllParticipants(this.competition.id).subscribe((par: Participating[]) => {
      this.participantes = par;
      console.log(par);
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

  getAllCompetitionsForDelegate() {
    this.competitionService.getAllCompetitionsForDelegate(this.user.id).subscribe((comp: Competition[]) => {
      comp.forEach(c => {
        this.competitions.set(c.id, c);
      });
      this.competition = comp[0];
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


}
