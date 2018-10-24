import { Injectable } from '@angular/core';
/* decorator marking participant in dependency injection system */
@Injectable({
  /* service is available at root level
  *  service is registered as a provider with the root injector */
  providedIn: 'root'
})
export class MessageService {
  messages : string[] = [];

  constructor() { }

  add(message : string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
