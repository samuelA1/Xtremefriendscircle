import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../_services/network.service';
import { AuthService } from '../auth.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.scss']
})
export class UserFriendsComponent implements OnInit {
users: any = [];
friends: any = [];
filteredFriends : any = [];
  constructor(private _network: NetworkService, private _auth: AuthService) { }

  async ngOnInit() {
    try {
      this.friends = await this._network.getFriends();
    } catch (error) {
      console.log(error);
    }

    try {
      this.users = await this._auth.getUsers();
      
      this.users.forEach(element => {
        if(this.isFriend(element)) {
          this.filteredFriends.push(Object.assign(element, {friend: true}))
        } else {
          this.filteredFriends.push(Object.assign(element, {friend: false}))

        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async addFriend(user: any) {
    const friend = await this._network.addFriend(user.id);

    user.friend = true;
  }

  async removeFriend(user: any) {
    const friend = await this._network.removeFriend(user.id);

    user.friend = false;
  }

  isFriend(user: any) {
    var found = false;
    for(var i = 0; i < this.friends.length; i++) {
    if (this.friends[i].id === user.id) {
         found = true;
         return found;
    }
}
  }

  

}
