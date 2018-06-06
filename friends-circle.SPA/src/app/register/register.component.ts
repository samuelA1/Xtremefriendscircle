import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public model : any = {};

  constructor(private _auth : AuthService,
     private _router: Router,
     private _alertify: AlertifyService) { }

  ngOnInit() {
  }

  async submitHandler() {
    const data = await this._auth.register(this.model);
    if(data['success']) {
      localStorage.setItem('token', data['access_token']);
      this._router.navigate(['/feed']);
      this._auth.getLoggedInUser();
      this._alertify.success('Registration successful');
    } else {
      this._alertify.error('Registration unsuccessful');
    }
  }
}
