import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from './item/item';
import { MessageService } from './message.service';
import { ITEMS } from './itemList/itemList';

/* decorator marking participant in dependency injection system */
@Injectable({
  /* service is available at root level
  *  service is registered as a provider with the root injector */
  providedIn: 'root'
})
export class ItemService {

  private itemsUrl = 'api/items';  // URL to web api

  constructor(private http: HttpClient, private messageService : MessageService) { }

  getItem(id : number) : Observable<Item> {
    // TODO : send the message after fetching item
    this.messageService.add(`ItemService : fetching item id=${id}`);
    return of(ITEMS.find(item => item.id === id));
  }

  getItems() : Observable<Item[]> {
    this.messageService.add('ItemService : fetched items');
    return this.http.get<Item[]>(this.itemsUrl); // swapped of with http.get
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
