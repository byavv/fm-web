import { Component, Injector } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserApi } from '../../../shared/services';

@Component({
    selector: 'signup',
    template: require("./signup.html")
})

export class SignUpComponent {
    signInForm: FormGroup;
    error: string;
    constructor(builder: FormBuilder,
        private router: Router,
        private userApi: UserApi,
      //  private storage: Storage
    ) {
        this.signInForm = builder.group({
            "username": ["admin"],
            "email": ["myemail@gmail.com"],
            "password": ["admin"]
        });
    }

    onSubmit(value) {
        this.userApi.signup(value).subscribe(
            data => this.onSuccess(data),
            err => this.onError(err)
        );
    }
    onSuccess(data) {
        console.log(data);
        this.router.navigate(['/auth/login']);
    }

    onError(err) {
        this.error = "Login failed"
    }
}