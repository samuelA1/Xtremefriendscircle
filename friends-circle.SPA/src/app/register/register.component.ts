import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/User';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public model : User

  constructor(private _auth : AuthService) { }

  ngOnInit() {
    this.model = new User();
  }

  submitHandler() {
    this._auth.register(this.model);
  }
}
