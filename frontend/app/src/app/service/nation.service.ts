import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NationService {
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAll() {
    return this.http.get(`${this.uri}/getAllNations`);
  }

  get(idNation) {
    const data = {
      id: idNation
    }

    return this.http.post(`${this.uri}/getNation`, data);
  }

}
