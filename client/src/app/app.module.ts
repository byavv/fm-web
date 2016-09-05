import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { CommonModule } from '@angular/common';

import { LOCALE_ID } from '@angular/core';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routes, GUARDS } from './app.routes';

// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';

import {
  TranslateLoader,
  TranslateStaticLoader,
  TranslateService
} from "ng2-translate/ng2-translate";

// Redux
import { StoreModule } from '@ngrx/store';
import reducer from './lib/reducers';

// Application modules and dependencies
import { AppState } from './app.service';
import { InertLink } from "./shared/directives";

import { QuickSearchComponent } from "./_home/landingForm/quickSearchBase";
import { Err404 } from "./_err404/err404";
// Redux actions, common services, components, directives to be used throughout the app 
import { SharedModule } from "./shared";

// Application wide providers
const PROVIDERS = [
  {
    provide: TranslateLoader,
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'i18n', '.json'),
    deps: [Http]
  },
  ...ENV_PROVIDERS,
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    QuickSearchComponent,
    Err404
  ],
  imports: [
    // import Angular's modules
    BrowserModule,
    HttpModule,

    // import third-party modules
    RouterModule.forRoot(routes, { useHash: false }),
    StoreModule.provideStore(reducer),

    // import Shared module
    SharedModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ...PROVIDERS,
    ...GUARDS,
    // in your component / module providers definition
    { provide: LOCALE_ID, useValue: window.navigator.language }
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
