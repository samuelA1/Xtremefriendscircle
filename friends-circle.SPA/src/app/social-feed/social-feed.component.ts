import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NetworkService } from '../_services/network.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-social-feed',
  templateUrl: './social-feed.component.html',
  styleUrls: ['./social-feed.component.scss']
})
export class SocialFeedComponent implements OnInit {
  currentUser;
  posts: any = [];

  constructor(private _auth: AuthService,
     private _network: NetworkService,
     private _router: Router,
     private _alertify: AlertifyService) { }

 async ngOnInit() {
  try {
    this._auth.token = localStorage.getItem('token');

    const data = await this._auth.getLoggedInUser();

    this.currentUser = Object.assign({}, {
      fullName : `${data['firstName']} ${data['lastName']}`
    });

    this._alertify.message(`Logged in as ${this.currentUser.fullName}`)

    let posts: any = []
    posts = await this._network.getAllPosts();
    posts.forEach(element => {
      this.getUserPost(element.author_id).then(data => {
        const singlePost = {
          content: element.content,
          created_at: element.created_at,
          author: `${data['firstName']} ${data['lastName']}`
        }
        this.posts.push( singlePost);
      });
    });
  } catch (error) {
    this._alertify.error(error['message'])
  }
    this.addEntry = this.addEntry.bind(this)
}

async getUserPost(userId) {
  const data = await this._auth.getUser(userId);
  return data
}

async addEntry(entry) {
  if (entry.content !== '')
    this.posts.push({content: entry.content, author: this.currentUser.fullName, created:{date:Date.now()}})

  const data = await this._network.createPost({content: entry.content, visibility: entry.visibility});
}

logout() {
  this._auth.logout();

  this._router.navigate(['/login']);
  this._alertify.success('Logout successful');
}
    
}
