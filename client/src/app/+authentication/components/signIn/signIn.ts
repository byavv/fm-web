import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserApi } from '../../../shared/services';
import { LoopBackAuth } from '../../../core';

@Component({
    selector: 'login',
    template: require('./signIn.html')
})
export class SignInComponent {
    signInForm: FormGroup;
    error: string;

    constructor(builder: FormBuilder,
        private router: Router,
        private userApi: UserApi,
        private authService: LoopBackAuth
    ) {
        this.signInForm = builder.group({
            'username': [''],
            'password': ['']
        });
    }
    onSubmit(value) {
        this.userApi.login(value)
            .subscribe(
            (data) => this.onSuccess(data),
            (err) => this.onError(err));
    }
    onSuccess(data) {
        console.log(data);
        this.authService.update({
            accessToken: data.id,
            username: data.user.username
        });
        this.authService.save();
        this.router.navigate(['/']);
    }
    onError(err) {
        this.error = 'Login failed';
    }
}
