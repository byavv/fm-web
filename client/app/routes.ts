import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login';
import { SignUpComponent } from './authentication/components/signUp/signup';
import { QuickSearchComponent } from "./quickSearch/components/quickSearchBase"
import { CarsSearchComponent } from "./regularSearch/components/searchBase"
import { CarDetailsComponent } from "./carDetails/carDetails";
import { ACCOUNT_ROUTER_PROVIDERS } from "./account/components/routes";

export const routes: RouterConfig = [
  { path: '', component: QuickSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'search/:maker', component: CarsSearchComponent },
  ...ACCOUNT_ROUTER_PROVIDERS,
  { path: '**', redirectTo: '/login' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
