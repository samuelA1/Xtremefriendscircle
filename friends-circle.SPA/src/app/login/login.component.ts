import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public model : any = {}
  user: any;

  constructor(private _auth : AuthService,
     private _router: Router,
     private _alertify: AlertifyService) { }

  ngOnInit() {
    
  }

  async login() {
    try {
      const data = await this._auth.login(this.model);
      data['success'] ? (localStorage.setItem('token', data['access_token']),
      this._alertify.success('Login successful'), 
      this._router.navigate(['/feed'])
    )
       : this._alertify.error('Failed to login');
  
    } catch (error) {
      this._alertify.error(error['message']);
    }
  }

}
