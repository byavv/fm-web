import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoopBackAuth } from '../../../core';
import { Identity, AuthApi, UserApi } from '../../services';

@Component({
    selector: 'app-header',
    template: require('./header.html')
})
export class Header implements OnInit {
    isAuthenticated: boolean = false;
    shouldRedirect: boolean;
    username: string;

    constructor(      
        private auth: LoopBackAuth,
        private router: Router,
        private userApi: UserApi
    ) { }

    ngOnInit() {
        var currentUser = this.auth.user;
        this.username = currentUser
            ? currentUser.username
            : "Guest";
        this.isAuthenticated = currentUser.isAuthenticated();
        this.auth.identity$.subscribe((user) => {
            this.isAuthenticated = user.isAuthenticated();
            this.username = user
                ? user.username
                : "Guest";
        })     


    }
    signOut() {
        this.userApi.logout()
            .subscribe((res) => {
                this.router.navigate(['/'])
            }, console.error);
    }
}
