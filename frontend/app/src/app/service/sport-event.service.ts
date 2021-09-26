import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportEventService {
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAll() {
    return this.http.get(`${this.uri}/getAllEvents`);
  }

  insert(sport, discipline, gender, date, time, location) {
    const data = {
      sport: sport,
      discipline: discipline,
      gender: gender,
      date: date,
      time: time,
      location: location
    }

    return this.http.post(`${this.uri}/insertEvent`, data);
  }

  getEvents(sport, discipline, gender, date, time, location) {
    const data = {
      sport: sport,
      discipline: discipline,
      gender: gender,
      date: date,
      time: time,
      location: location
    }

    return this.http.post(`${this.uri}/getEvents`, data);
  }

  insertParticipating(idCompetition, athletes, round) {
    const data = {
      idCompetition: idCompetition,
      athletes: athletes,
      round: round
    }

    return this.http.post(`${this.uri}/insertParticipating`, data);
  }


  getAllParticipants(idCompetition) {
    const data = {
      idCompetition: idCompetition
    }

    return this.http.post(`${this.uri}/getAllParticipants`, data);
  }

  updataParticipating(idParticipating, result) {
    const data = {
      idParticipating: idParticipating,
      result: result
    }

    return this.http.post(`${this.uri}/updataParticipating`, data);
  }

  update(sport, discipline, gender, date, time, location) {
    const data = {
      sport: sport,
      discipline: discipline,
      gender: gender,
      date: date,
      time: time,
      location: location
    }

    return this.http.post(`${this.uri}/updateEvent`, data);
  }

}
