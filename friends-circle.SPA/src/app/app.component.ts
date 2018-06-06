import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Friends' Circle";

  constructor(private _auth: AuthService) {
    this._auth.token = localStorage.getItem('token');
  }

  async ngOnInit() {
    await this._auth.getLoggedInUser();
  }

}
