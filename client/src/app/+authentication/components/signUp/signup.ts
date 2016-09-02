import { Component, Injector } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Identity, AuthApi, Storage } from '../../../shared/services';

@Component({
    selector: 'signup',
    template: require("./signup.html")
})

export class SignUpComponent {
    signInForm: FormGroup;
    error: string;
    constructor(builder: FormBuilder,
        private router: Router,
        private authService: AuthApi,
        private identityService: Identity, private storage: Storage
    ) {
        this.signInForm = builder.group({
            "username": ["admin"],
            "email": ["myemail@gmail.com"],
            "password": ["admin"]
        });
    }

    onSubmit(value) {
        this.authService.signUp(value).subscribe(
            data => this.onSuccess(data),
            err => this.onError(err)
        );
    }
// TODO:AUTH
  /*  routerOnActivate() {
        if (this.identityService.user.isAuthenticated()) {
            this.router.navigate(['/Home']);
        }
    }*/

    onSuccess(data) {

        console.log(data);
        this.router.navigate(['/Home']);

    }

    onError(err) {
        this.error = "Login failed"
    }
}