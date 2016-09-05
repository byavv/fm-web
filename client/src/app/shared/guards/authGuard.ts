import { Injectable } from "@angular/core";
import { AuthApi, Identity, Storage } from "../services";
import { Observable, Observer } from "rxjs";

import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private permService: AuthApi, private router: Router, private identity: Identity, private storage: Storage) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            this.permService
                .authorize()               
                .toPromise()
                .then(result => {
                    observer.next(true);
                    observer.complete();
                })
                .catch((err) => {
                    observer.next(false);
                    observer.complete();
                    this.identity.update(null);
                    this.storage.removeItem("authorizationData");
                    this.router.navigate(["/auth/signin", { from: state.url }]);
                })
        });
    }
}