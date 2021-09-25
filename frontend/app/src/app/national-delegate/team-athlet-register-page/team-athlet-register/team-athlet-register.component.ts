import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { Athlete } from 'src/app/model/athlete.model';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { SportService } from 'src/app/service/sport.service';
import { AthleteService } from 'src/app/service/athlete.service';

@Component({
  selector: 'app-team-athlet-register',
  templateUrl: './team-athlet-register.component.html',
  styleUrls: ['./team-athlet-register.component.css']
})
export class TeamAthletRegisterComponent implements OnInit {

  constructor(private sportService: SportService, private athleteService: AthleteService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user != null && this.user.type === "national_delegate") {
      this.getAllSports();
      this.getAllDisciplines();
      this.getAthletesForNation();
    }
    else {
      this.router.navigate(['/']);
    }
  }

  user: User;

  sports: Sport[];
  disciplines: Discipline[];
  athletes: Athlete[];

  sport: string;
  discipline: string;
  gender: string;
  name: string;
  surname: string;
  idAthlete: string;

  errorMessage: string;

  addAthlete() {

    if(this.sport == null || this.discipline == null || this.gender == null ||
      this.name == null || this.surname == null || this.idAthlete == null || this.user.nation == null) {
        this.errorMessage = "You have to set all data";
    }
    else {
      if(this.alreadyCompinting()) {
        this.errorMessage = "Athlete is already compiting in this discipline";
      }
      else {
        this.athleteService.insertAthlete(this.discipline, this.gender, this.name, this.surname,
                                          parseInt(this.idAthlete), this.user.nation)
                                  .subscribe((res) => {
                                    if(res['message'] == 'OK') {
                                      this.getAthletesForNation();
                                    }
                                  });
        this.errorMessage = null;
      }

    }

  }

  alreadyCompinting() : boolean {
    for (let i = 0; i < this.athletes.length; i++) {
      const ath = this.athletes[i];
      for (let j = 0; j < ath.disciplinesObject.length; j++) {
        const dis = ath.disciplinesObject[j];
        if(dis === this.discipline) {
          return true;
        }
      }
    }
    return false;
  }

  uploadFile() {

  }

  removeAthlete(athlete: Athlete, dis: string) {
    if(athlete.disciplines.length == 1) {
      this.athleteService.removeAthlete(athlete.id).subscribe((res) => {
        if(res['message'] == 'OK') {
          this.getAthletesForNation();
          this.errorMessage = null;
        }
      })
    }
    else {
      for (let i = 0; i < athlete.disciplinesObject.length; i++) {
        const d = athlete.disciplinesObject[i];
        if(d === dis) {
          console.log(athlete.id, athlete.disciplines[i]);
          this.athleteService.removeDisciplineFromAthlete(athlete.id, athlete.disciplines[i])
                            .subscribe((res) => {
            if(res['message'] == 'OK') {
              this.getAthletesForNation();
              this.errorMessage = null;
            }
          })
          break;
        }
      }
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
        this.discipline = d.name;
        break;
      }
    }
  }

  getAthletesForNation() {
    this.athleteService.getAthletesForNation(this.user.nation).subscribe((ath: Athlete[]) => {
      this.athletes = ath;
      this.athletes.forEach(at => {
        at.sport = this.getSport(at.idSport);
        at.disciplinesObject = new Array<string>();
        at.disciplines.forEach(dis => {
          at.disciplinesObject.push(this.getDiscipline(dis));
        });
      });
    })
  }

  getSport(id: number) : string {
    for (let i = 0; i < this.sports.length; i++) {
      const spr = this.sports[i];
      if(spr.id == id) {
        return spr.name;
      }
    }
  }

  getDiscipline(id: number) : string {
    for (let i = 0; i < this.disciplines.length; i++) {
      const dis = this.disciplines[i];
      if(dis.id == id) {
        return dis.name;
      }
    }
  }
}
