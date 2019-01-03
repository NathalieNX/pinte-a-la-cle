import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../authentication.service';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  private details: UserDetails

  constructor(private authenticationService: AuthenticationService, private messageService: MessageService) { }

  ngOnInit() {
    this.authenticationService.getProfile().subscribe( user => {
      this.details = user;
    }, (err) => {
      this.log(err);
    });
  }

  /** Log a ItemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ViewProfileComponent: ${message}`);
  }

}
