import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  insertCompetition(discipline, gender, startDate, endDate, location, format) {
    const data = {
      discipline: discipline,
      gender: gender,
      startDate: startDate,
      endDate: endDate,
      location: location,
      format: format
    }

    return this.http.post(`${this.uri}/insertCompetition`, data);
  }

  insertCompeting(sport, discipline, gender, idAthlete) {
    const data = {
      sport: sport,
      discipline: discipline,
      gender: gender,
      idAthlete: idAthlete
    }

    return this.http.post(`${this.uri}/insertCompeting`, data);
  }

  insertDelegateing(sport, discipline, gender, idDelegate) {
    const data = {
      sport: sport,
      discipline: discipline,
      gender: gender,
      idDelegate: idDelegate
    }

    return this.http.post(`${this.uri}/insertDelegateing`, data);
  }

  getDiscipline(idCompetition) {
    const data = {
      idCompetition: idCompetition
    }

    return this.http.post(`${this.uri}/getDisciplineForCompetition`, data);
  }

  getLocations() {
    return this.http.get(`${this.uri}/getLocations`);
  }

  getCompetitions() {
    return this.http.get(`${this.uri}/getCompetitions`);
  }
}
