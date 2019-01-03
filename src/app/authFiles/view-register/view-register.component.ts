import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../../authentication.service';
import { Router } from '@angular/router';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-view-register',
  templateUrl: './view-register.component.html',
  styleUrls: ['./view-register.component.css']
})
export class ViewRegisterComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private authenticationService: AuthenticationService, private router: Router, private messageService: MessageService) { }

  ngOnInit() { }

  register() {
    // TODO delete this
    this.log("Credentials are : " + this.credentials.email + " " + this.credentials.name + " " + this.credentials.password);
    this.authenticationService.register(this.credentials).subscribe( () => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      // TODO delete this
      this.log("Error found");
      console.error(err);
    });
  }

  /** Log a ItemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ViewRegister: ${message}`);
  }

}
