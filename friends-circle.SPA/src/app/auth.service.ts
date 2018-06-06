import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost/friends-circle/public/api'
  token: any;
  constructor(private _http : HttpClient) {
    this.token = localStorage.getItem('token');

   }

  getHeaders() {
    const token = this.token;
    return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
}

  register(user : any) {
    return this._http.post(this.baseUrl + '/auth/register', user).toPromise();
  }

  login(user : any) {
    return this._http.post(this.baseUrl + '/auth/login', user).toPromise();
  }

  getLoggedInUser() {
    return this._http.get(this.baseUrl + '/auth/me', {headers: this.getHeaders()}).toPromise();
  }
  getUsers() {
    return this._http.get(this.baseUrl + '/users',{headers: this.getHeaders()}).toPromise();
  }

  getUser(userId: any) {
    return this._http.get(this.baseUrl + '/users/' + userId, {headers: this.getHeaders()}).toPromise();
  }

  logout() {
    localStorage.clear();
    
    this.token = null;
  }

}
