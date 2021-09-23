import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NationService } from 'src/app/service/nation.service';
import { Nation } from 'src/app/model/nation.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private nationService: NationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllNations();
  }

  nations: Nation[];
  username: string;
  password: string;
  name: string;
  surname: string;
  nation: string;
  email: string;
  user_type: string;

  errorMessage: string;

  getAllNations() {
    this.nationService.getAll().subscribe((nat: Nation[]) => {
      this.nations = nat;
    })
  }

  register() {
    console.log(this.username, this.password, this.name, this.surname,
                this.nation, this.email, this.user_type);
    if(this.username == null || this.password == null || this.name == null || this.surname == null ||
      this.nation == null || this.email == null || this.user_type == null) {
        this.errorMessage = "You must fill all fields";
      }
      else {
        if(this.checkPassword()) {
          if(this.user_type === "National delegate") {
            this.user_type = "national_delegate";
          }
          else if(this.user_type === "Competition delegate") {
            this.user_type = "competition_delegate";
          }
          this.userService.register(this.username, this.password, this.name, this.surname,
                                    this.nation, this.email, this.user_type).subscribe(obj => {
              if(obj['message'] == 'OK') {
                alert("Your registration has been submitet. " +
                      "When registration is approved you will be able to login");
                this.router.navigate(['']);
              }
              else {
                alert("Something went wrong! Please submit your registration again.");
              }
          })
        }
        else {
          this.errorMessage =
                      "Password must contain minimum of 1 upercase, " +
                      "3 lowercase, 2 digits and 2 special characters, " +
                      "and must not have 3 characters in a row";
        }
      }
  }

  checkPassword() : boolean {
    if(this.password.length < 8 || this.password.length > 12) {
      return false;
    }

    let up: number = 0;
    let low: number = 0;
    let digit: number = 0;
    let special: number = 0;
    let row: number = 0;
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;


    for (let i = 0; i < this.password.length; i++) {
      const char = this.password.charAt(i);
      if(format.test(char)) {
        if(i == 0) {
          return false;
        }
        special++;
        row = 0;
      }
      else if(char >= '0' && char <= '9') {
        if(i == 0) {
          return false;
        }
        digit++;
        row = 0;
      }
      else if(char == char.toUpperCase()) {
        up++;
        row++;
      }
      else if(char == char.toLowerCase()) {
        low++;
        row++
      }
      if(row > 3) {
        return false;
      }
    }
    if(up >= 1 && low >= 3 && digit >= 2 && special >= 2) {
      return true;
    }
    else {
      return false;
    }
  }
}
