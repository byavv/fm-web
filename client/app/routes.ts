import { provideRouter, RouterConfig } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login';
import { SignUpComponent } from './authentication/components/signUp/signup';
import { QuickSearchComponent } from "./quickSearch/components/quickSearchBase"
import { CarsSearchComponent } from "./regularSearch/components/searchBase"
import { CarDetailsComponent } from "./carDetails/carDetails";
import { ACCOUNT_ROUTER_PROVIDERS } from "./account/components/routes";
import { GUARDS } from "./shared/guards";

export const routes: RouterConfig = [
  { path: '', component: QuickSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'search/:maker', component: CarsSearchComponent },
  { path: 'details/:id', component: CarDetailsComponent },
  ...ACCOUNT_ROUTER_PROVIDERS,
  { path: '**', redirectTo: '/' }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  ...GUARDS
];
