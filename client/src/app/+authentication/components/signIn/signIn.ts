import { Component, Injector } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Identity, AuthApi, Storage } from '../../../shared/services';
import { UserApi } from '../../../shared/services';
import { LoopBackAuth } from '../../../core';

@Component({
    selector: 'login',
    template: require("./signIn.html")
})

export class SignInComponent {
    signInForm: FormGroup;
    error: string;
    constructor(builder: FormBuilder,
        private router: Router,
        //  private authService: AuthApi,
        private userApi: UserApi,
        private authService: LoopBackAuth,
        private identityService: Identity,
        //private storage: Storage
    ) {
        this.signInForm = builder.group({
            "username": ["admin"],
            "password": ["admin"]
        });
    }

    onSubmit(value) {
        /* this.authService.signIn(value).subscribe(
             data => this.onSuccess(data),
             err => this.onError(err)
         );*/
        this.userApi.login(value)
            .subscribe((data) => this.onSuccess(data), (err) => this.onError(err))

    }
    // TODO:AUTH
    /*  routerOnActivate() {
          if (this.identityService.user.isAuthenticated()) {
              this.router.navigate(['/Home']);
          }
      }*/

    onSuccess(data) {
        console.log(data);
        this.authService.update({ accessToken: data.id, username: data.user.username });
        this.authService.save();
        this.router.navigate(['/']);
        /* if (data && data.token) {
             this.storage.setItem("authorizationData", JSON.stringify(data))
             this.identityService.update(data);
             this.router.navigate(['/']);
         } else {
             this.error = "Unexpected server error";
         }*/
    }

    onError(err) {
        this.error = "Login failed"
    }
}