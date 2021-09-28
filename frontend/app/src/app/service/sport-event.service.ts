import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportEventService {
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllReadyEvents(idCompetition) {
    const data = {
      idCompetition: idCompetition
    }
    return this.http.post(`${this.uri}/getAllReadyEvents`, data);
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

  getEventsForCompetition(idCompetition) {
    const data = {
      idCompetition: idCompetition
    }

    return this.http.post(`${this.uri}/getEventsForCompetition`, data);
  }

  insertParticipating(idCompetition, athletes, round, series) {
    const data = {
      idCompetition: idCompetition,
      athletes: athletes,
      round: round,
      series: series
    }

    return this.http.post(`${this.uri}/insertParticipating`, data);
  }


  getAllParticipants(idCompetition) {
    const data = {
      idCompetition: idCompetition
    }

    return this.http.post(`${this.uri}/getAllParticipants`, data);
  }

  setResults(participantes) {
    const data = {
      participantes: participantes
    }

    return this.http.post(`${this.uri}/setResults`, data);
  }

  updateParticipating(idAthlete, idEvent, result) {
    const data = {
      idAthlete: idAthlete,
      idEvent: idEvent,
      result: result
    }

    return this.http.post(`${this.uri}/updateParticipating`, data);
  }

  updateEvent(idEvent, date, time) {
    const data = {
      idEvent: idEvent,
      date: date,
      time: time
    }

    return this.http.post(`${this.uri}/updateEvent`, data);
  }

}
