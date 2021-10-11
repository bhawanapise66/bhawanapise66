import { LoginService } from './../../layout/projectcompononts/services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        if (sessionStorage.getItem('isLoggedin')) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}

export class EntryGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) { }

    // canActivate() {
    //     if (this.loginService.loginData.roleId != null && this.loginService.loginData.ownersId != null) {
    //         return true;
    //     }
    //     this.router.navigate(['login'])
    //     return false;
    // }
    canActivate() {
        if (this.loginService.loginData == undefined) {
            this.router.navigate(['/login'])
            return false;
        }
        else {
            return true;
        }
    }


}


export class EntryGuardWeb implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) { }
    canActivate() {
           return true;
     
    }
    


}
