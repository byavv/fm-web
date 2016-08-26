// The first thing we should do
import 'angular2-universal/polyfills';
// Angular 2
import { provide, PLATFORM_DIRECTIVES, enableProdMode } from '@angular/core';
import { Http } from '@angular/http';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter, ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
// Angular2-universal
import { prebootComplete } from 'angular2-universal';
// i18n
import {
    TranslateLoader,
    TranslateStaticLoader,
    TranslateService
} from "ng2-translate/ng2-translate";
// Redux
import { provideStore } from '@ngrx/store';
import reducer from './app/shared/reducers';
// Application
import { App } from './app/app';
import { InertLink } from "./app/shared/directives";

import { APP_ROUTER_PROVIDERS } from './app/routes';
import { APP_SERVICES_PROVIDERS } from "./app/shared/services";
import { ACTIONS_PROVIDERS } from "./app/shared/actions";

const PROVIDERS = [

    ...HTTP_PROVIDERS,

    ...APP_ROUTER_PROVIDERS,
    ...APP_SERVICES_PROVIDERS,
    ...ACTIONS_PROVIDERS,

    provideStore(reducer),
    provide(TranslateLoader, {
        useFactory: (http: Http) => new TranslateStaticLoader(http, 'i18n', '.json'),
        deps: [Http]
    }),
    provide(PLATFORM_DIRECTIVES, { useValue: InertLink, multi: true }),
    provide(PLATFORM_DIRECTIVES, { useValue: [ROUTER_DIRECTIVES], multi: true }),
    disableDeprecatedForms(),
    provideForms()
];

enableProdMode();

document.addEventListener('DOMContentLoaded', () => {
    bootstrap(App, PROVIDERS)
        .then(prebootComplete)
        .catch(console.error)
});

