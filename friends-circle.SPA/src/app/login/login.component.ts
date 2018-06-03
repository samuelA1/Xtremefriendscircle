import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/User';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public model : any = {}

  constructor(private _auth : AuthService, private _router: Router) { }

  ngOnInit() {
    this.model = new User();
  }

  async login() {
    try {
      const data = await this._auth.login(this.model);
      data['success'] ? (localStorage.setItem('token', data['access_token']),
      console.log('success'), this._router.navigate(['/feed'])) : console.log('Failure');
    } catch (error) {
      console.log(error);
    }
  }

}
