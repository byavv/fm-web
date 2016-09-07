import { Injectable } from "@angular/core";
import { LoopBackAuth } from "../auth.service";
import { Observable, Observer } from "rxjs";
import { ProfileApi } from "../../shared/services/custom/Profile";

import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: LoopBackAuth, private profileApi: ProfileApi, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            this.profileApi
                .me()
                .toPromise()
                .then(result => {
                    observer.next(true);
                    observer.complete();
                })
                .catch((err) => {
                    observer.next(false);
                    observer.complete();
                    this.auth.update(null);
                    this.auth.clearStorage();
                    this.router.navigate(["/auth/signin", { from: state.url }]);
                })
        });
    }
}