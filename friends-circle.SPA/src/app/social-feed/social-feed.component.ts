import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NetworkService } from '../_services/network.service';

@Component({
  selector: 'app-social-feed',
  templateUrl: './social-feed.component.html',
  styleUrls: ['./social-feed.component.scss']
})
export class SocialFeedComponent implements OnInit {
  currentUser;
  posts: any = [];

  constructor(private _auth: AuthService, private _network: NetworkService) { }

 async ngOnInit() {
  try {
    const data = await this._auth.getLoggedInUser();
    this.currentUser = Object.assign({}, {
      fullName : `${data['firstName']} ${data['lastName']}`
    })
    } catch (error) {
    console.log(error)
    }

    const posts = await this._network.getAllPosts();
    this.posts = posts;

    this.addEntry = this.addEntry.bind(this)
}

async addEntry(entry) {
  this.posts.push({content: entry.content, author: this.currentUser.fullName, created:{date:Date.now()}})

  const data = await this._network.createPost({content: entry.content});
}

    
}
