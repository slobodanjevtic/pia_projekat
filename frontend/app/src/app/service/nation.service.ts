import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NationService {
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllNations() {
    return this.http.get(`${this.uri}/getAllNations`);
  }

  getNationsWithAthletes() {
    return this.http.get(`${this.uri}/getNationsWithAthletes`);
  }

  getNationsWithMedals() {
    return this.http.get(`${this.uri}/getNationsWithMedals`);
  }


  getNation(idNation) {
    const data = {
      id: idNation
    }

    return this.http.post(`${this.uri}/getNation`, data);
  }

}
