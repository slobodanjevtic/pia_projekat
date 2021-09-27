import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { User } from 'src/app/model/user.model';
import { Athlete } from 'src/app/model/athlete.model';
import { SportService } from 'src/app/service/sport.service';
import { AthleteService } from 'src/app/service/athlete.service';
import { CompetitionService } from 'src/app/service/competition.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Competition } from 'src/app/model/competition.model';
import { Competing } from 'src/app/model/competing.model';
import { Registered } from 'src/app/model/registered.model';

@Component({
  selector: 'app-competition-formation',
  templateUrl: './competition-formation.component.html',
  styleUrls: ['./competition-formation.component.css']
})
export class CompetitionFormationComponent implements OnInit {

  constructor(private sportService: SportService, private competitionService: CompetitionService,
              private athleteService: AthleteService, private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user != null && this.user.type === "organizer") {
      this.getAllCompetitions();
      this.getAllDelegates();
    }
    else {
      this.router.navigate(['/']);
    }
  }

  user: User;
  sports: Sport[];
  disciplines: Map<number, Discipline> = new Map<number, Discipline>();
  competitions: Map<number, Competition> = new Map<number, Competition>();
  delegates: User[];
  athletes: Map<number, Athlete> = new Map<number, Athlete>();

  sport: string;
  competition: Competition;
  delegate: User;

  errorMessage: string;

  getAllCompetitions() {
    this.competitionService.getCompetitions().subscribe((comp: Competition[]) => {
      comp.forEach(c => {
        this.competitions.set(c.id, c);
      });
      this.competition = comp[0];
      console.log(this.competitions);
      this.getAllSports();
    })
  }

  getAllSports() {
    this.sportService.getAllSports().subscribe((spr: Sport[]) => {
      this.sports = spr;
      console.log(this.sports);
      this.getAllDisciplines();
    })
  }

  getAllDisciplines() {
    this.sportService.getAllDisciplines().subscribe((dis: Discipline[]) => {
      dis.forEach(d => {
        this.disciplines.set(d.id, d);
      });
      console.log(this.disciplines);
      this.getAllAthletes();
    })
  }

  getAllAthletes() {
    this.athleteService.getAllAthletes().subscribe((ath: Athlete[]) => {
      ath.forEach(a => {
        a.competitions = new Array<number>();
        a.newCompetitions = new Array<number>();
        a.disciplines = new Array<number>();
        this.athletes.set(a.id, a);
      });
      this.competitionService.getAllCompetings().subscribe((comp: Competing[]) => {
        comp.forEach(c => {
          if(this.athletes.has(c.idAthlete)) {
            this.athletes.get(c.idAthlete).competitions.push(c.idCompetition);
            this.athletes.get(c.idAthlete).newCompetitions.push(c.idCompetition);
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
      })

      console.log(this.athletes);
    })
  }

  getAllDelegates() {
    this.userService.getCompetitionDelegates().subscribe((del: User[]) => {
      this.delegates = del;
      if(this.delegates != null) {
        this.delegate = this.delegates[0];
      }
    })
  }

  isCompeting(ath: Athlete, idComp: number) : boolean {
    if(ath.newCompetitions == null) {
      return false;
    }
    for (let i = 0; i < ath.newCompetitions.length; i++) {
      const comp = ath.newCompetitions[i];
      if(comp == idComp) {
        return true
      }
    }
    return false;
  }

  setCompeting(ath: Athlete, idComp: number, reg: boolean) {

    if(reg) {
      ath.newCompetitions.push(idComp);
    }
    else {
      ath.newCompetitions.forEach((comp, i)=>{
        if(comp == idComp) {
          ath.newCompetitions.splice(i, 1);
        }
      });
    }
    console.log(ath);
  }

  save() {
    if(this.delegate == null) {
      this.errorMessage = "Please select competition delegate";
    }
    else {
      if(this.delegate.id == this.competition.idDelegate || this.delegate.delegating < 3) {
        this.athletes.forEach(ath => {
          ath.disciplines.forEach(dis => {
            if(dis == this.getDiscipline() && ath.gender == this.competition.gender) {
              if(parseInt(this.competition.format) >= 4 && parseInt(this.competition.format) <= 6) {
                if(!this.checkSeeds()) {
                  this.errorMessage = "All athletes must be different seeded";
                  return;
                }
              }
              if(ath.newCompetitions.includes(this.competition.id) && !ath.competitions.includes(this.competition.id)) {
                //add
                this.competitionService.updateCompeting(ath.id, this.competition.id, true, ath.seed, 0).subscribe((res) => {
                  if(res['message'] != 'OK') {
                    this.errorMessage = "Error ocured";
                  }
                })
              }
              else if(!ath.newCompetitions.includes(this.competition.id) && ath.competitions.includes(this.competition.id)) {
                //remove
                this.competitionService.updateCompeting(ath.id, this.competition.id, false, ath.seed, 0).subscribe((res) => {
                  if(res['message'] != 'OK') {
                    this.errorMessage = "Error ocured";
                  }
                })
              }
            }
          });
        });
        if(this.delegate.id != this.competition.idDelegate) {
          this.competitionService.updateDelegate(this.competition.id, this.delegate.id).subscribe((res) => {
            if(res['message'] != 'OK') {
              this.errorMessage = "Error ocured";
            }
            else {
              this.getAllDelegates();
            }
          })
        }
      }
      else {
        this.errorMessage = "Competition delegate is already delegating 3 competitions";
      }
    }

  }

  checkSeeds() {
    let arr = new Array<number>(16);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = 0;
    }
    this.athletes.forEach(ath => {
      if(ath.newCompetitions.includes(this.competition.id)) {
        arr[ath.seed - 1]++;
      }

    });
    for (let i = 0; i < arr.length; i++) {
      if(arr[i] > 1) {
        return false;
      }
    }
    return true;
  }
/*
  setCompeting() {
    this.athletes.forEach(ath => {
      for (let i = 0; i < ath.disciplines.length; i++) {
        const dis = ath.disciplines[i];
        if(ath.seed == null) {
          ath.seed = 0;
        }
        if(dis == this.getIdDiscipline(this.competition.discipline)) {
          //ath.competing[i] = (dis['competing'] == 1);
          break;
        }
      }
    });
    console.log(this.athletes);
  }
*/
  getIdDiscipline(name: string) : number {
    let id = -1;
    this.disciplines.forEach(dis => {
      if(dis.name === name) {
        id = dis.id;
        return;
      }
    });
    return id;
  }

  getIdSport() : number {
    for (let i = 0; i < this.sports.length; i++) {
      const spr = this.sports[i];
      if(spr.name === this.competition.sport) {
        return spr.id;
      }
    }
    return -1;
  }

  getDiscipline() : number {
    let id = -1;
    this.disciplines.forEach(dis => {
      if(dis.name === this.competition.discipline) {
        id = dis.id;
        return;
      }
    });
    return id;
  }

}
