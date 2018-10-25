import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.css']
})
export class ViewLoginComponent implements OnInit {

  user : User;

  constructor(protected userService : UserService) { }

  ngOnInit() : void {
    this.getUser("no user");
  }

  getUser(username : string) : void {
    /* route.snapshot is a static image of route info
    *  paramMap is dict of route parameter values
    *  the key id returns the id */
    this.userService.getUser(username).subscribe(user => this.user = user);
  }

  setUser(): void {
    this.userService.setUser(this.user).subscribe();
  }

  login(): void {
    this.getUser(this.user.username);
    this.setUser();
    // go to homepage via routing
  }


}
