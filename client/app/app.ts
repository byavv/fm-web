import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { Router, ROUTER_DIRECTIVES } from "@angular/router";
import { Identity, Storage, APP_SERVICES_PROVIDERS, AppController } from "./shared/services";
import { ACTIONS_PROVIDERS } from "./shared/actions";
import { Header } from "./shared/components/header/header";
import { AccountBase } from "./account/components/accountBase";
import { LoaderComponent } from "./shared/components/loader/loader";

import { AppState, getCatalogReady } from "./shared/reducers";
import { CatalogActions } from "./shared/actions";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";

import '../assets/styles/main.scss';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES, Header, LoaderComponent],
  template: `
    <div class="page-wrap">
      <loader [active]='loading' [async]='init$' (completed)='loading=false'></loader>      
       <app-header></app-header>
       <div [hidden]='loading' class='container-fluid'>
          <div class='content-area'>
              <router-outlet>
              </router-outlet>
          </div>
      </div>
    </div>         
  `,
  providers: []
})
export class App {
  loading = true;
  init$: Observable<any>;
  constructor(
    private identity: Identity,
    private storage: Storage,
    private store: Store<AppState>,
    private catalogActions: CatalogActions,
    appController: AppController) {
    this.init$ = this.store
      .let(getCatalogReady())

    appController.start();
    identity.update(JSON.parse(storage.getItem("authorizationData")));
  }
}
