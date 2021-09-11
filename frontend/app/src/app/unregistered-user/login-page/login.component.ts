import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.user = null;
    this.userService.loggedInUser.next(null);
  }

  username: string;
  password: string;
  user: User;

  login() {
    //this.userService.login(this.username, this.password).subscribe((u: User) => this.user = u);
    this.user = new User();
    this.user.type = "national-delegate";
    this.userService.loggedInUser.next(this.user);
    sessionStorage.setItem("user", JSON.stringify(this.user));
    this.router.navigate(['']);
  }


}
