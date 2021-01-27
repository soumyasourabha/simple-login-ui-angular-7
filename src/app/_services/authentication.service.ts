import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public user : User;
    constructor(private http: HttpClient,
                private userService : UserService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string, role : String , logInDtm : Date, ip : String) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password, role, logInDtm ,ip})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    user["logInRole"] = role;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        var logOutDtm = new Date();
        var currentUser = localStorage.getItem('currentUser');
        this.user = JSON.parse(currentUser);
        this.user["logOutDtm"] = logOutDtm;
        this.user['id'] = this.user['_id'];
        this.userService.update(this.user).subscribe(() => {});
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}