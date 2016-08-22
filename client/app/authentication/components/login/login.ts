import { Component, Injector } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from "@angular/router";
import { FormGroup, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Identity, AuthApi, Storage } from '../../../shared/services';

@Component({
    selector: 'login',
    directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    template: require("./login.html")
})

export class LoginComponent {
    signInForm: FormGroup;
    error: string;
    constructor(builder: FormBuilder,
        private router: Router,
        private authService: AuthApi,
        private identityService: Identity, private storage: Storage
    ) {
        this.signInForm = builder.group({
            "username": ["admin"],
            "password": ["admin"]
        });
    }

    onSubmit(value) {
        this.authService.signIn(value).subscribe(
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
        if (data && data.token) {
            this.storage.setItem("authorizationData", JSON.stringify(data))
            this.identityService.update(data);
            this.router.navigate(['/']);
        } else {
            this.error = "Unexpected server error";
        }
    }

    onError(err) {
        this.error = "Login failed"
    }
}