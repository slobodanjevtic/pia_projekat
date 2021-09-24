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

  getAllDisciplines(idSport) {
    const data = {
      idSport: idSport
    }

    return this.http.post(`${this.uri}/getAllDisciplines`, data);
  }

  updateDiscipline(idDiscipline, status) {
    const data = {
      idDiscipline: idDiscipline,
      status: status
    }

    return this.http.post(`${this.uri}/updateDiscipline`, data);
  }
}
