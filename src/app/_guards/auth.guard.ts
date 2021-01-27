import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if(state.url == "/audit" && currentUser["logInRole"] == "Auditor"){
            return true;
        }
        else if(state.url == "/" && currentUser){
            return true;
        }
        else{
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
        // not logged in so redirect to login page with the return url
        
    }
}