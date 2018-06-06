import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/User';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public model : any = {};

  constructor(private _auth : AuthService, private _router: Router) { }

  ngOnInit() {
    this.model = new User();
  }

  async submitHandler() {
    const data = await this._auth.register(this.model);
    if(data['success']) {
      this._router.navigate(['/feed']);
      this._auth.getLoggedInUser();
    } else {
      console.log('failed')
    }
  }
}
