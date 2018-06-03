import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-social-feed',
  templateUrl: './social-feed.component.html',
  styleUrls: ['./social-feed.component.scss']
})
export class SocialFeedComponent implements OnInit {
  currentUser;

  constructor(private _auth: AuthService) { }

 async ngOnInit() {
  try {
    const data = await this._auth.getLoggedInUser();
    this.currentUser = Object.assign({}, {
      fullName : `${data['firstName']} ${data['lastName']}`
    })
  } catch (error) {
    console.log(error)
  }
  }

  addEntry(entry) {
    alert(entry.content);
  }
}
