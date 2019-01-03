import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from './itemFiles/item/item';
import { ItemLost } from './itemFiles/item/item-lost';
import { ItemFound } from './itemFiles/item/item-found';
import { MessageService } from './message.service';

/* The itemes web API expects a special header in HTTP save requests.
*  That header is in the httpOptions constant defined in the ItemService. */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/* decorator marking participant in dependency injection system */
@Injectable({
  /* service is available at root level
  *  service is registered as a provider with the root injector */
  providedIn: 'root'
})
export class ItemService { 

  //private apiUrl = 'http://localhost:3000';
  //private itemsUrl = `${this.apiUrl}/api/items`;  // URL to web api
  //private itemsLostUrl = `${this.apiUrl}/api/itemsLost`;  

  private itemsUrl = `api/items`;  // URL to web api
  private itemsLostUrl = `api/itemsLost`;  
  private itemsFoundUrl = `api/itemsFound`;  
  

  constructor(private http: HttpClient, private messageService : MessageService) { }

  /** GET item by id */


  getItem(id : number) : Observable<Item> {
    // TODO : send the message after fetching item
    const url = `${this.itemsUrl}/${id}`;

    return this.http.get<Item>(url) // swapped of with http.get
    .pipe(
      tap(_ => this.log(`fetched item id=${id}`)), // taps into flow of observables
      catchError(this.handleError<Item>(`getItem id=${id}`)) // invoke handleError
    ); 
  }

  getItemLost(id : number) : Observable<ItemLost> {
    // TODO : send the message after fetching item
    const url = `${this.itemsLostUrl}/${id}`;
    return this.http.get<ItemLost>(url) // swapped of with http.get
    .pipe(
      tap(_ => this.log(`fetched lost item id=${id}`)), // taps into flow of observables
      catchError(this.handleError<ItemLost>(`getItemLost id=${id}`)) // invoke handleError
    ); 
  }

  getItemFound(id : number) : Observable<ItemFound> {
    // TODO : send the message after fetching item
    const url = `${this.itemsFoundUrl}/${id}`;
    return this.http.get<ItemFound>(url) // swapped of with http.get
    .pipe(
      tap(_ => this.log(`fetched found item id=${id}`)), // taps into flow of observables
      catchError(this.handleError<ItemFound>(`getItemFound id=${id}`)) // invoke handleError
    ); 
  }

  /** GET all items */

  getItems() : Observable<Item[]> {
    // all HttpClient methods return a RxJS observable of something
    // in htis case the observable is an array of Item which will only ever emit once (at return)
    // this.itemsUrl returns an untyped JSON obj : casting it to Item[] ensures an array of Item return
    return this.http.get<Item[]>(this.itemsUrl) // swapped of with http.get
      .pipe(
        tap(_ => this.log('fetched items')), // taps into flow of observables
        catchError(this.handleError('getItems', [])) // invoke handleError
      ); 
  }

  getItemsLost() : Observable<ItemLost[]> {
    // all HttpClient methods return a RxJS observable of something
    // in htis case the observable is an array of ItemLost which will only ever emit once (at return)
    // this.itemsLostUrl returns an untyped JSON obj : casting it to ItemLost[] ensures an array of ItemLost return
    //TODO delete this
    //console.log("Service - getItemsLost - get result :", this.http.get<ItemLost[]>(this.itemsLostUrl).subscribe(val => console.log(val)));
    return this.http.get<ItemLost[]>(this.itemsLostUrl) // swapped of with http.get
      .pipe(
        tap(_ => this.log('fetched lost items')), // taps into flow of observables
        catchError(this.handleError('getItemsLost', [])) // invoke handleError
      ); 
  }

  getItemsFound() : Observable<ItemFound[]> {
    // all HttpClient methods return a RxJS observable of something
    // in htis case the observable is an array of ItemFound which will only ever emit once (at return)
    // this.itemsFoundUrl returns an untyped JSON obj : casting it to ItemFound[] ensures an array of ItemFound return
    return this.http.get<ItemFound[]>(this.itemsFoundUrl) // swapped of with http.get
      .pipe(
        tap(_ => this.log('fetched found items')), // taps into flow of observables
        catchError(this.handleError('getItemsFound', [])) // invoke handleError
      ); 
  }

  /** GET items whose name contains search term */
  searchItems(term: string): Observable<Item[]> {
    if (!term.trim()) {
      // if not search term, return empty item array.
      return of([]);
    }

    return this.http.get<Item[]>(`${this.itemsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`term is "${term}"`)),
      catchError(this.handleError<Item[]>('searchItems', []))
    );
  }

  /** POST: add a new item to the server */
  addItem (item: Item): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item, httpOptions)
    .pipe(
      tap((item: Item) => this.log(`added item w/ id=${item.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );
  }

  addItemLost (itemLost: ItemLost): Observable<ItemLost> {
    return this.http.post<ItemLost>(this.itemsLostUrl, itemLost, httpOptions)
    .pipe(
      tap((itemLost: ItemLost) => this.log(`added lost item w/ id=${itemLost.id}`)),
      catchError(this.handleError<ItemLost>('addItemLost'))
    );
  }

  addItemFound (itemFound: ItemFound): Observable<ItemFound> {
    return this.http.post<ItemFound>(this.itemsFoundUrl, itemFound, httpOptions)
    .pipe(
      tap((itemFound: ItemFound) => this.log(`added found item w/ id=${itemFound.id}`)),
      catchError(this.handleError<ItemFound>('addItemFound'))
    );
  }

  /** PUT: update the item on the server */
  updateItem(item : Item) : Observable<any> {
    return this.http.put(this.itemsUrl, item, httpOptions) // httpOptions is defined above in consts
    .pipe(
      tap(_ => this.log(`updated item id=${item.id}`)), // taps into flow of observables
      catchError(this.handleError<any>('UpdateItem')) // invoke handleError
    );
  }

  updateItemLost(itemLost : ItemLost) : Observable<any> {
    return this.http.put(this.itemsLostUrl, itemLost, httpOptions) // httpOptions is defined above in consts
    .pipe(
      tap(_ => this.log(`updated lost item id=${itemLost.id}`)), // taps into flow of observables
      catchError(this.handleError<any>('UpdateItemLost')) // invoke handleError
    );
  }

  updateItemFound(itemFound : ItemFound) : Observable<any> {
    return this.http.put(this.itemsFoundUrl, itemFound, httpOptions) // httpOptions is defined above in consts
    .pipe(
      tap(_ => this.log(`updated found item id=${itemFound.id}`)), // taps into flow of observables
      catchError(this.handleError<any>('UpdateItemFound')) // invoke handleError
    );
  }

  /** DELETE: delete the item from the server */
  deleteItem (item: Item | number): Observable<Item> {
    const id = typeof item === 'number' ? item : item.id;
    const url = `${this.itemsUrl}/${id}`;

    return this.http.delete<Item>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted item id=${id}`)),
      catchError(this.handleError<Item>('deleteItem'))
    );
  }

  deleteItemLost (itemLost: ItemLost | number): Observable<ItemLost> {
    const id = typeof itemLost === 'number' ? itemLost : itemLost.id;
    const url = `${this.itemsLostUrl}/${id}`;

    return this.http.delete<ItemLost>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted lost item id=${id}`)),
      catchError(this.handleError<ItemLost>('deleteItemLost'))
    );
  }

  deleteItemFound (itemFound: ItemFound | number): Observable<ItemFound> {
    const id = typeof itemFound === 'number' ? itemFound : itemFound.id;
    const url = `${this.itemsFoundUrl}/${id}`;

    return this.http.delete<ItemFound>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted found item id=${id}`)),
      catchError(this.handleError<ItemFound>('deleteItemFound'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  /** Log a ItemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }
}
