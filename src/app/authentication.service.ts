import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from './message.service';


export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token : string;

  constructor(private http : HttpClient, private router : Router, private messageService : MessageService) { }

  // set token 
  private saveToken(token : string) {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  // Get token
  private getToken() : string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  // Remove token / logout 
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  // Get user details from token info if valid
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  // Check whether user is logged in
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  // request handler : handles register, login and profile requests
  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;
    // send HttpClient get or post request
    if (method === 'post') {
      // ATT this is source of collection not found error. Asks for 'register'
      base = this.http.post(`/api/${type}`, user);
    } else {
      // pass token to API through GET request header
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
  
    const request = base.pipe(
      map((data: TokenResponse) => {
        // if a data token is returned by the API login call, save it 
        this.log("data.token is : " + data.token);
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  // emit a registration request
  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }
  
  // emit a login request
  public login(user: TokenPayload): Observable<any> {
    this.log(user.email + " " + user.name + " " + user.password)
    return this.request('post', 'login', user);
  }
  
  // emit a profile request
  public getProfile(): Observable<any> {
    return this.request('get', 'profile');
  }

  /** Log a ItemService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AuthenticationService: ${message}`);
  }

} 
