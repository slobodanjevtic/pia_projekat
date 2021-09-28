import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllSports() {
    return this.http.get(`${this.uri}/getAllSports`);
  }

  getAllDisciplines() {
    return this.http.get(`${this.uri}/getAllDisciplines`);
  }

  updateDiscipline(discipline, status, regex) {
    const data = {
      discipline: discipline,
      status: status,
      regex: regex
    }

    return this.http.post(`${this.uri}/updateDiscipline`, data);
  }

  addNewSportAndDiscipline(sport, discipline, regex) {
    const data = {
      sport: sport,
      discipline: discipline,
      regex: regex,
    }

    return this.http.post(`${this.uri}/addNewSportAndDiscipline`, data);
  }
}
