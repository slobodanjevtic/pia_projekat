import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AthleteService {
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllAthletes() {
    return this.http.get(`${this.uri}/getAllAthletes`);
  }

  getAllAthletesWithMedals() {
    return this.http.get(`${this.uri}/getAllAthletesWithMedals`);
  }

  insert(sport, discipline, gender, name, surname) {
    const data = {
      sport: sport,
      discipline: discipline,
      gender: gender,
      name: name,
      surname: surname
    }

    return this.http.post(`${this.uri}/insertAthlete`, data);
  }

  remove(idAthlete) {
    const data = {
      idAthlete: idAthlete
    }

    return this.http.post(`${this.uri}/removeAthlete`, data);
  }

  insertMedalist(idAthlete, medal) {
    const data = {
      idAthlete: idAthlete,
      medal: medal
    }

    return this.http.post(`${this.uri}/insertMedalist`, data);
  }

  getMedalist(idAthlete) {
    const data = {
      idAthlete: idAthlete
    }

    return this.http.post(`${this.uri}/getMedalist`, data);
  }

  getMedalCount(idNation) {
    const data = {
      idNation: idNation
    }

    return this.http.post(`${this.uri}/getMedalCount`, data);
  }


}
