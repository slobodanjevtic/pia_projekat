import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-register-requests',
  templateUrl: './register-requests.component.html',
  styleUrls: ['./register-requests.component.css']
})
export class RegisterRequestsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  users: User[];

  accept(usr: User) {

  }

  decline(usr: User) {

  }

}
