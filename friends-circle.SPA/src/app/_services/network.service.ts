import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

@Injectable()
export class NetworkService {
    baseUrl = 'http://localhost/friends-circle/public/api'

    constructor(private _http : HttpClient) { }
  
    getHeaders() {
      const token = localStorage.getItem('token');
      return token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : null;
  }

  getAllPosts() {
      return this._http.get(this.baseUrl + '/posts', {headers: this.getHeaders()}).toPromise();
  }

  createPost(post: any) {
      return this._http.post(this.baseUrl + '/posts', post, {headers: this.getHeaders()}).toPromise();
  }

  getFriends() {
    return this._http.get(this.baseUrl + '/users/friends', {headers: this.getHeaders()}).toPromise();
  }

  addFriend(friendId: any) {
      return this._http.post(this.baseUrl + '/users/' + friendId + '/add_friend', {},
       {headers: this.getHeaders()}).toPromise();
  }

  removeFriend(friendId: any) {
      return this._http.post(this.baseUrl + '/users/' + friendId + '/remove_friend', {},
    {headers: this.getHeaders()}).toPromise();
  }

}