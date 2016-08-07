import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { Router, ROUTER_DIRECTIVES } from "@angular/router";
import { Identity, Storage, APP_SERVICES_PROVIDERS, AppController } from "./shared/services";
import { ACTIONS_PROVIDERS } from "./shared/actions";
import { Header } from "./shared/components/header/header";
import { FORM_PROVIDERS } from '@angular/common';
import { AccountBase } from "./account/components/accountBase";
import { LoaderComponent } from "./shared/components/loader/loader";

// applied to the whole app
import '../assets/styles/main.scss';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES, Header, LoaderComponent],
  template: `
    <div class="page-wrap">
      <loader [active]='loading' [async]='appController.init$'></loader>      
       <app-header></app-header>
       <div [hidden]='loading' class='container-fluid'>
          <div class='content-area'>
              <router-outlet>
              </router-outlet>
          </div>
      </div>
    </div>         
  `,
  providers: [FORM_PROVIDERS, APP_SERVICES_PROVIDERS, ACTIONS_PROVIDERS]
})

export class App {
  loading = true;
  constructor(private identity: Identity, private storage: Storage, private appController: AppController) {
    this.appController.init$.subscribe(() => {
      this.loading = false;
    })
    this.appController.start();
    identity.update(JSON.parse(storage.getItem("authorizationData")));
  }
}
