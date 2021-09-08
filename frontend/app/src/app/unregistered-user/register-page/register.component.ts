import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  nations: string[];
  username: string;
  password: string;
  name: string;
  surname: string;
  nation: string;
  email: string;
  user_type: string;

  register() {

  }
}
