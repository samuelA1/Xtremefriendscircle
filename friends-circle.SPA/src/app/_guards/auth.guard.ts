import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    token = localStorage.getItem('token');
    constructor(private _router: Router) {
    }

    canActivate() {
        if(this.token) {
            return true
        }

        this._router.navigate(['/login']);
        return false;
    }
}