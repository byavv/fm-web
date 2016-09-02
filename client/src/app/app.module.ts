import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { TranslateModule } from 'ng2-translate/ng2-translate';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routes, ROUTES_PROVIDERS } from './app.routes';
// App is our top level component
import { App } from './app.component';
//import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import {
  TranslateLoader,
  TranslateStaticLoader,
  TranslateService
} from "ng2-translate/ng2-translate";
// Redux
import { provideStore } from '@ngrx/store';
import reducer from './shared/reducers';
// Application modules and dependencies
import { AppState } from './app.service';
import { InertLink } from "./shared/directives";
import { RegularSearchModule } from "./+regularSearch";
import { AccountModule } from "./+account";

import { APP_SERVICES_PROVIDERS } from "./shared/services";
import { ACTIONS_PROVIDERS } from "./shared/actions";

const PROVIDERS = [
  {
    provide: TranslateLoader,
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'i18n', '.json'),
    deps: [Http]
  },
  ...ENV_PROVIDERS,
  ...APP_SERVICES_PROVIDERS,
  AppState,
  ...ACTIONS_PROVIDERS,
  provideStore(reducer)
];



/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    InertLink
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: false }),
    TranslateModule.forRoot(),
    RegularSearchModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ...PROVIDERS,
    ...ROUTES_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }
  hmrOnInit(store) {
    if (!store || !store.state) return;
    console.log('HMR store', store);
    this.appState._state = store.state;
    this.appRef.tick();
    delete store.state;
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
