import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../authentication.service';
import { Router } from '@angular/router';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-view-login',
  templateUrl: './view-login.component.html',
  styleUrls: ['./view-login.component.css']
})
export class ViewLoginComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(protected authenticationService : AuthenticationService, private router: Router, private messageService : MessageService) { }

  ngOnInit() : void { }

  login() {
    this.authenticationService.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  /** Log a ItemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }


}
