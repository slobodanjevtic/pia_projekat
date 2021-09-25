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
    this.userService.loggedInUser.next(null);
  }

  username: string;
  password: string;

  errorMessage: string;

  login() {
    if(this.username == null || this.password == null) {
      this.errorMessage = "You must enter username and password";
    }
    else {
      this.userService.login(this.username, this.password).subscribe((u: User[]) => {
        console.log(u[0]);
        if(u != null) {
          this.userService.loggedInUser.next(u[0]);
          sessionStorage.setItem('user', JSON.stringify(u[0]));
          this.router.navigate(['']);
        }
        else {
          this.errorMessage = "No such a user";
        }

      });
    }


  }


}
