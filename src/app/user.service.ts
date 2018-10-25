import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user/user';
import { MessageService } from './message.service';

/* The itemes web API expects a special header in HTTP save requests.
*  That header is in the httpOptions constant defined in the ItemService. */
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // TODO make this a modifiable attribute over all instances of service
  currentUser : User;
  private usersUrl = 'api/users';  // URL to web api

  constructor(private http: HttpClient, private messageService : MessageService) { }

  getUser(username : string) : Observable<User> {
    const url = `${this.usersUrl}/${username}`;
    return this.http.get<User>(url)
    .pipe(
      tap(_ => this.log(`fetched user username=${username}`)), 
      catchError(this.handleError<User>(`getUser username=${username}`)) // invoke handleError
    ); 
  }

  getUsers() : Observable<User[]> {
    // all HttpClient methods return a RxJS observable of something
    // in htis case the observable is an array of Item which will only ever emit once (at return)
    // this.itemsUrl returns an untyped JSON obj : casting it to Item[] ensures an array of Item return
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(items => this.log('fetched users')), // taps into flow of observables
        catchError(this.handleError('getUsers', [])) // invoke handleError
      ); 
  }

  setUser(user : User) : Observable<User> {
    this.currentUser = user;
    const url = `${this.usersUrl}/${user.username}`;
    console.log("Boo");
    return this.http.get<User>(url)
    .pipe(
      tap(_ => this.log(`fetched user username=${user.username}`)), 
      catchError(this.handleError<User>(`getUser username=${user.username}`)) // invoke handleError
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
    this.messageService.add(`UserService: ${message}`);
  }
}
