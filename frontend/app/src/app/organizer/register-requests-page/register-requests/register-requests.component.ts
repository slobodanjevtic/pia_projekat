import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-requests',
  templateUrl: './register-requests.component.html',
  styleUrls: ['./register-requests.component.css']
})
export class RegisterRequestsComponent implements OnInit {

  constructor(private userSevtice: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user"));
    if(this.user != null && this.user.type === "organizer") {
      this.getAllPendingUsers();
    }
    else {
      this.router.navigate(['/']);
    }
  }

  users: User[];
  user: User;

  accept(usr: User) {
    this.userSevtice.updateUser(usr.id, 1).subscribe(() => {
      this.getAllPendingUsers();
    })
  }

  decline(usr: User) {
    this.userSevtice.updateUser(usr.id, -1).subscribe(() => {
      this.getAllPendingUsers();
    })
  }

  getAllPendingUsers() {
    this.userSevtice.getAllPendingUsers().subscribe((usr: User[]) => {
      this.users = usr;
      console.log(this.users);
    })
  }

}
