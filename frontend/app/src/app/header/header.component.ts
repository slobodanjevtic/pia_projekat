import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
    this.userService.loggedInUser.subscribe( u => {
      if(u == null) {
        this.user = null;
      }
      else {
        this.user = new User(u);
      }
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  }

  user: User;

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    sessionStorage.clear();
    this.user = null;
    this.router.navigate(['login']);
  }
}
