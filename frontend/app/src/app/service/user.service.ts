import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedInUser: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(username, password) {
    const data = {
      username: username,
      password: password
    }

    this.http.post(`${this.uri}/login`, data);
  }
}
