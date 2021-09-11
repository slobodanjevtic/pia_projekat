import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedInUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/login`, data);
  }

  register(username, password, name, surname, nation, email, type) {
    const data = {
      username: username,
      password: password,
      name: name,
      surname: surname,
      nation: nation,
      email: email,
      type: type
    }

    return this.http.post(`${this.uri}/register`, data);
  }

  getAll() {
    return this.http.get(`${this.uri}/getAllUsers`);
  }


  updateUser(idUser, status) {
    const data = {
      idUser: idUser,
      status: status
    }

    return this.http.post(`${this.uri}/updateUser`, data);
  }

  getCompetitionDelegates() {
    return this.http.get(`${this.uri}/getCompetitionDelegates`);
  }
}
