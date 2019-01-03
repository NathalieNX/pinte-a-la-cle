import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.css']
})
export class ViewLoginComponent implements OnInit {

  user : User;

  constructor(protected userService : UserService, private messageService : MessageService) { }

  ngOnInit() : void {
    this.log("Initializing user to no user");
    this.getUser("no user");
  }

  getUser(name : string) : void {
    this.log("Getting user")
    /* route.snapshot is a static image of route info
    *  paramMap is dict of route parameter values
    *  the key id returns the id */
    this.userService.getUser(name).subscribe(user => this.user = user);
  }

  setUser(): void {
    this.userService.setUser(this.user).subscribe();
  }

  login(): void {
    this.getUser(this.user.name);
    this.setUser();
    // go to homepage via routing
  }

  /** Log a ItemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }


}
