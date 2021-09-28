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

  getAthletesForNation(nation) {
    const data = {
      nation: nation
    }

    return this.http.post(`${this.uri}/getAthletesForNation`, data);
  }

  getAllAthletesWithMedals() {
    return this.http.get(`${this.uri}/getAllAthletesWithMedals`);
  }

  insertAthlete(discipline, gender, name, surname, idAthlete, nation) {
    const data = {
      discipline: discipline,
      gender: gender,
      name: name,
      surname: surname,
      idAthlete: idAthlete,
      nation: nation
    }

    return this.http.post(`${this.uri}/insertAthlete`, data);
  }

  insertAthletesFromFile(file, nation) {
    const data = {
      file: file,
      nation: nation
    }

    return this.http.post(`${this.uri}/insertAthleteFromFile`, data);
  }

  removeAthlete(idAthlete) {
    const data = {
      idAthlete: idAthlete
    }

    return this.http.post(`${this.uri}/removeAthlete`, data);
  }

  removeDisciplineFromAthlete(idAthlete, idDiscipline) {
    const data = {
      idAthlete: idAthlete,
      idDiscipline: idDiscipline
    }

    return this.http.post(`${this.uri}/removeDisciplineFromAthlete`, data);
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
