import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/model/sport.model';
import { Discipline } from 'src/app/model/discipline.model';
import { EventLocation } from 'src/app/model/event_location.model';
import { SportEvent } from 'src/app/model/sport_event.model';
import { User } from 'src/app/model/user.model';
import { Competition } from 'src/app/model/competition.model';
import { Athlete } from 'src/app/model/athlete.model';
import { AthleteService } from 'src/app/service/athlete.service';
import { CompetitionService } from 'src/app/service/competition.service';
import { SportEventService } from 'src/app/service/sport-event.service';
import { Router } from '@angular/router';
import { Competing } from 'src/app/model/competing.model';
import { Registered } from 'src/app/model/registered.model';
import { Participating } from 'src/app/model/participating.model';

@Component({
  selector: 'app-schedule-formation',
  templateUrl: './schedule-formation.component.html',
  styleUrls: ['./schedule-formation.component.css']
})
export class ScheduleFormationComponent implements OnInit {

  constructor(private competitionService: CompetitionService, private sportEventService: SportEventService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user != null && this.user.type === "competition_delegate") {
      this.getAllCompetitionsForDelegate();
    }
    else {
      this.router.navigate(['/']);
    }
  }

  user: User;
  competitions: Map<number, Competition> = new Map<number, Competition>();
  events: SportEvent[];
  competition: Competition;

  errorMessage: string;

  save() {
    if(this.isOverlapping()) {
      this.errorMessage = "Events on same location cannot begin at same date and time";
    }
    else {
      this.events.forEach(ev => {
        console.log(ev.date, ev.time);
        if(ev.date == null || ev.time == null) {
          //this.errorMessage = "You must set date and time of events";
        }
        else if(ev.date < this.competition.startDate || ev.date > this.competition.endDate) {
          this.errorMessage = "Date of events must be in between start and end date of competition";
        }
        else  {
          this.errorMessage = null;
          this.sportEventService.updateEvent(ev.id, ev.date, ev.time).subscribe((res) => {
            if(res['message'] != 'OK') {
              this.errorMessage = "Something went wrong!";
            }
          })
        }

      });
    }

  }

  isOverlapping() : boolean {
    let map: string[] = [];
    let s: string;

    for (let i = 0; i < this.events.length; i++) {
      const ev = this.events[i];
      s = ev.location + ev.date + ev.time;
      if(map.includes(s)) {
        return true;
      }
      else {
        map.push(s);
      }
    }
    return false;
  }

  getAllCompetitionsForDelegate() {
    this.competitionService.getAllCompetitionsForDelegate(this.user.id).subscribe((comp: Competition[]) => {
      comp.forEach(c => {
        this.competitions.set(c.id, c);
      });
      this.competition = comp[0];
      this.getEventsForCompetition();
    })
  }


  getEventsForCompetition() {
    this.sportEventService.getEventsForCompetition(this.competition.id).subscribe((spEv: SportEvent[]) => {
      this.events = spEv;
      this.events.forEach(ev => {
        ev.competitionPeriod = this.competition.startDate + " - " + this.competition.endDate;
      });
      this.events.sort((a, b) => {
        if(a.date > b.date) return 1;
        if(a.date < b.date) return -1;
        if(a.time > b.time) return 1;
        if(a.time < b.time) return -1;
        return 0;
      })
    })
  }
}
