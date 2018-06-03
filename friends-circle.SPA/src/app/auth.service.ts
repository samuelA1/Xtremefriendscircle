import { Injectable } from '@angular/core';
import { User } from '../entities/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost/friends-circle/public/api'
  constructor(private _http : HttpClient) { }

  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
}

  register(user : User) {
    return this._http.post(this.baseUrl + '/auth/register', user).toPromise();
  }

  login(user : User) {
    return this._http.post(this.baseUrl + '/auth/login', user).toPromise();
  }

  getLoggedInUser() {
    return this._http.get(this.baseUrl + '/auth/me', {headers: this.getHeaders()}).toPromise();
  }

}
