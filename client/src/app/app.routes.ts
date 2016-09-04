import { Routes, RouterModule } from '@angular/router';
import { AuthenticationBase } from './+authentication/components/authBase';
import { QuickSearchComponent } from "./_home/landingForm/quickSearchBase"
import { Err404 } from "./_err404"


export const routes: Routes = [
  { path: '', component: QuickSearchComponent },
  { path: 'auth', loadChildren: () => System.import('./+authentication') },
  { path: 'personal', loadChildren: () => System.import('./+account') },
  { path: 'search', loadChildren: () => System.import('./+search') },
  { path: '**', component: Err404 }
];

import { Injectable } from "@angular/core";
import { AuthApi, Identity, Storage } from "./shared/services";
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
          this.router.navigate(["/login", { from: state.url }]);
        })
    });
  }
}

export const GUARDS: any[] = [
  AuthGuard
];
