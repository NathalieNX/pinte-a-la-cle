import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Upload } from './uploadFiles/upload/upload';
import { MessageService } from './message.service';

/* The items web API expects a special header in HTTP save requests.
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
export class UploadService {

  //private apiUrl = 'http://localhost:3000';
  //private uploadsUrl = `${this.apiUrl}/api/uploads`;  // URL to web api

  private uploadsUrl = `api/uploads`;  // URL to web api

  constructor(private http: HttpClient, private messageService : MessageService) { }

  getUpload(id : number) : Observable<Upload> {
    // TODO : send the message after fetching item
    const url = `${this.uploadsUrl}/${id}`;

    return this.http.get<Upload>(url) // swapped of with http.get
    .pipe(
      tap(_ => this.log(`fetched upload id=${id}`)), // taps into flow of observables
      catchError(this.handleError<Upload>(`getUpload id=${id}`)) // invoke handleError
    ); 
  }

  getUploads() : Observable<Upload[]> {
    // all HttpClient methods return a RxJS observable of something
    // in htis case the observable is an array of Upload which will only ever emit once (at return)
    // this.itemsUrl returns an untyped JSON obj : casting it to Upload[] ensures an array of Item return
    console.log("UploadService.ts - get result :", this.http.get<Upload[]>(this.uploadsUrl).subscribe(val => console.log(val)));
    return this.http.get<Upload[]>(this.uploadsUrl) // swapped of with http.get
      .pipe(
        tap(_ => this.log('fetched uploads')), // taps into flow of observables
        catchError(this.handleError('getUploads', [])) // invoke handleError
      ); 
  }

  /* GET uploads whose name contains search term */
  searchUploads(term: string): Observable<Upload[]> {
    if (!term.trim()) {
      // if not search term, return empty upload array.
      return of([]);
    }

    return this.http.get<Upload[]>(`${this.uploadsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`term is "${term}"`)),
      catchError(this.handleError<Upload[]>('searchUploads', []))
    );
  }

  /** POST: add a new upload to the server */
  addUpload (upload: Upload): Observable<Upload> {
    this.log("UploadService.ts - adding upload");
    return this.http.post<Upload>(this.uploadsUrl, upload, httpOptions)
    .pipe(
      tap((upload: Upload) => this.log(`added upload w/ id=${upload.id}`)),
      catchError(this.handleError<Upload>('addUpload'))
    );
  }

  /*
  Upload.create(newUpload, function (err, next) {
    if (err) {
      next(err);
    } else {
      res.send(newUpload);
    }
  });
  */

  /** PUT: update the item on the server */
  updateItem(upload : Upload) : Observable<any> {
    return this.http.put(this.uploadsUrl, upload, httpOptions) // httpOptions is defined above in consts
    .pipe(
      tap(_ => this.log(`updated upload id=${upload.id}`)), // taps into flow of observables
      catchError(this.handleError<any>('UploadItem')) // invoke handleError
    );
  }

  /** DELETE: delete the upload from the server */
  deleteUpload (upload: Upload | number): Observable<Upload> {
    const id = typeof upload === 'number' ? upload : upload.id;
    const url = `${this.uploadsUrl}/${id}`;

    return this.http.delete<Upload>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted upload id=${id}`)),
      catchError(this.handleError<Upload>('deleteItem'))
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
    this.messageService.add(`UploadService: ${message}`);
  }
}