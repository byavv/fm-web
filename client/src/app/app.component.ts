import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { Router } from "@angular/router";
import { AppController } from "./shared/services";
import { ACTIONS_PROVIDERS, CatalogActions } from "./core/actions";
import { Header } from "./shared/components/header/header";

import { LoopBackAuth } from './core';
import { LoaderComponent } from "./shared/components/loader/loader";
import { AppState, getCatalogReady } from "./core/reducers";

import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";

import '../../assets/styles/main.scss';

import { LoopBackConfig } from './app.config';

@Component({
  selector: 'app',
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
     <app-footer></app-footer>   
  `,
  providers: []
})
export class App {
  loading = true;
  init$: Observable<any>;
  constructor(
    private auth: LoopBackAuth,   
    private store: Store<AppState>,
    private catalogActions: CatalogActions,
    appController: AppController) {

    LoopBackConfig.setBaseURL('http://localhost:3000');
    LoopBackConfig.setApiVersion('api');

    this.init$ = this.store
      .let(getCatalogReady());
    appController.start();
    auth.update(auth.initFromStorage());
  }
}
