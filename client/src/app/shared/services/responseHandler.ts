import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Identity } from './identity';
import { Storage } from './storage';

@Injectable()
export class ResponseHandler {
    constructor(private router: Router, private identity: Identity, private storage: Storage) { }

    public handleError(error: Response, allowArrayResult = false): any {

    }

    public handleSuccess(args): any {

    }

    public handle401(): any {
        this.identity.update(null);
        this.storage.removeItem("authorizationData");
        this.router.navigate(['/auth/signin']);
    }

    public handle500(): any {
        //todo: notify user with error popup dialog or smth else
    }
}