import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { SportService } from 'src/app/service/sport.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-sport-enter',
  templateUrl: './sport-enter.component.html',
  styleUrls: ['./sport-enter.component.css']
})
export class SportEnterComponent implements OnInit {

  constructor(private sportService: SportService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user != null && this.user.type === "organizer") {
      this.getAllSports();
      this.getAllDisciplines();
      this.setRegex();
    }
    else {
      this.router.navigate(['/']);
    }

  }

  user: User;

  sports: Sport[];
  disciplines: Discipline[];

  sport: string;
  discipline: string;
  newSport: string;
  newDiscipline: string;
  resultFormat: string;
  resultFormatRegex: RegExp[] = [];

  errorMessage: string;

  setRegex() {
    this.resultFormatRegex.push(/^\d\d,\d\d$/);
    this.resultFormatRegex.push(/^\d\d:\d\d,\d\d$/);
    this.resultFormatRegex.push(/^\d\d:\d\d:\d\d$/);
    this.resultFormatRegex.push(/^\d,\d\d$/);
    this.resultFormatRegex.push(/^\d\d,\d\d$/);
    this.resultFormatRegex.push(/^\d\d\d,\d\d$/);
    this.resultFormatRegex.push(/^\d$/);

  }

  enterSport() {
    if(this.resultFormat == null) {
      this.errorMessage = "Please choose result format";
    }
    else {
      if(this.newDiscipline != null && this.newDiscipline.length > 0) {
        if(this.newSport != null && this.newSport.length > 0) {
          this.sportService.addNewSportAndDiscipline(this.newSport, this.newDiscipline, this.resultFormatRegex[parseInt(this.resultFormat)].source).subscribe((res) => {
            if(res['message'] == 'OK') {
              this.getAllDisciplines();
            }
          })
        }
        else {
          this.sportService.addNewSportAndDiscipline(this.sport, this.newDiscipline, this.resultFormatRegex[parseInt(this.resultFormat)].source).subscribe((res) => {
            if(res['message'] == 'OK') {
              this.getAllDisciplines();
            }
          })
        }
      }
      else {
        this.sportService.updateDiscipline(this.discipline, 1, this.resultFormatRegex[parseInt(this.resultFormat)].source).subscribe((res) => {
          if(res['message'] == 'OK') {
            this.getAllDisciplines();
          }
        })
      }
    }

  }

  remove(dis: string) {
    this.sportService.updateDiscipline(dis, 0, null).subscribe(() => {
      this.getAllDisciplines();
    })
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

}
