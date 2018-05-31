import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/User';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public model : User

  constructor(private _auth : AuthService) { }

  ngOnInit() {
    this.model = new User();
  }

  async login() {
    await this._auth.login(this.model);

    alert('Success!');
  }

}
