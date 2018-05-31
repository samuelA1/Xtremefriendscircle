import { Injectable } from '@angular/core';
import { User } from '../entities/User';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private _http : HttpClient) { }

  register(user : User) {
    this._http.post('/api/register', {
      user
    }).toPromise();
  }

  login(user : User) {
    return this._http.post('/auth', {
      username: user.email,
      password: user.password
    }).toPromise();
  }

}
