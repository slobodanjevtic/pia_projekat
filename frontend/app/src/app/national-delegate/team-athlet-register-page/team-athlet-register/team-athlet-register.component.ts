import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { Athlete } from 'src/app/model/athlete.model';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { SportService } from 'src/app/service/sport.service';
import { AthleteService } from 'src/app/service/athlete.service';
import { Registered } from 'src/app/model/registered.model';
import { CompetitionService } from 'src/app/service/competition.service';
import { Competition } from 'src/app/model/competition.model';

@Component({
  selector: 'app-team-athlet-register',
  templateUrl: './team-athlet-register.component.html',
  styleUrls: ['./team-athlet-register.component.css']
})
export class TeamAthletRegisterComponent implements OnInit {

  constructor(private sportService: SportService, private competitionService: CompetitionService, private athleteService: AthleteService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user != null && this.user.type === "national_delegate") {
      this.getAllSports();
    }
    else {
      this.router.navigate(['/']);
    }
  }

  user: User;

  sports: Map<number, Sport> = new Map<number, Sport>();
  disciplines: Map<number, Discipline> = new Map<number, Discipline>();
  athletes: Map<number, Athlete> = new Map<number, Athlete>();

  sport: string;
  discipline: string;
  gender: string;
  name: string;
  surname: string;
  idAthlete: string;
  file: File;

  errorMessage: string;

  addAthlete() {
    if(this.sport == null || this.discipline == null || this.gender == null ||
      this.name == null || this.surname == null || this.idAthlete == null || this.user.nation == null) {
        this.errorMessage = "You have to set all data";
    }
    else {
      this.competitionService.getCompetition(this.discipline, this.gender).subscribe((comp: Competition) => {
        if(comp.status == 0) {
          if(this.alreadyCompeting()) {
            this.errorMessage = "Athlete is already compiting in this discipline";
          }
          else {
            this.athleteService.insertAthlete(this.discipline, this.gender, this.name, this.surname,
                                              parseInt(this.idAthlete), this.user.nation)
                                      .subscribe((res) => {
                                        if(res['message'] == 'OK') {
                                          this.getAthletesForNation();
                                        }
                                        else {
                                          this.errorMessage = res['message'];
                                        }
                                      });
            this.errorMessage = null;
          }
        }
        else {
          this.errorMessage = "Competition registration is finished";
        }
      })


    }

  }

  alreadyCompeting() : boolean {
    let ret: boolean = false;
    const ath = this.athletes.get(parseInt(this.idAthlete));
    if(ath == null) {
      ret = false;
    }
    else {
      ath.disciplines.forEach(dis => {
        console.log(this.disciplines.get(dis).name, this.discipline);
        if(this.disciplines.get(dis).name == this.discipline) {
          ret = true;
        }
      });
      return ret;
    }

  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsText(this.file);
    fileReader.onload = function (e) {

      localStorage.setItem("file", <string>fileReader.result);
    };
  }

  sendFile() {
    let ath: any[] = JSON.parse(<string>localStorage.getItem('file'));

    this.athleteService.insertAthletesFromFile(ath, this.user.nation).subscribe((res) => {
      if(res['message'] == 'OK') {
        alert("File uploaded successfully");
      }
    })
  }


  removeAthlete(athlete: Athlete, dis: number) {
    this.athleteService.removeDisciplineFromAthlete(athlete.id, dis).subscribe((res) => {
      if(res['message'] == 'OK') {
        this.getAthletesForNation();
        this.errorMessage = null;
      }
    })
  }

  getAllSports() {
    this.sportService.getAllSports().subscribe((spr: Sport[]) => {
      spr.forEach(s => {
        this.sports.set(s.id, s);
      });
      this.sport = spr[0].name;
      this.getAllDisciplines();
    })
  }

  getAllDisciplines() {
    this.sportService.getAllDisciplines().subscribe((dis: Discipline[]) => {
      dis.forEach(d => {
        this.disciplines.set(d.id, d);
      });

      this.selectFirstDiscipline();
      this.getAthletesForNation();
    })

  }

  selectFirstDiscipline() {
    this.disciplines.forEach(dis => {
      if(dis.sport == this.sport) {
        this.discipline = dis.name;
        return;
      }
    });

  }

  getAthletesForNation() {
    this.athleteService.getAthletesForNation(this.user.nation).subscribe((ath: Athlete[]) => {
      ath.forEach(a => {
        a.sport = this.sports.get(a.idSport).name;
        this.athletes.set(a.id, a);
      });
      this.competitionService.getAllRegistered().subscribe((reg: Registered[]) => {
        reg.forEach(r => {
          if(this.athletes.has(r.idAthlete)) {
            if(this.athletes.get(r.idAthlete).disciplines == null) {
              this.athletes.get(r.idAthlete).disciplines = new Array<number>();
            }
            this.athletes.get(r.idAthlete).disciplines.push(r.idDiscipline);
          }

        });
        console.log(this.athletes);
      })

    })
  }

}
