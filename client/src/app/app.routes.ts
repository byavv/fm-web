import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './+authentication/components/login/login';
import { AuthenticationBase } from './+authentication/components/authBase';
import { QuickSearchComponent } from "./quickSearch/components/quickSearchBase"

import { CarDetailsComponent } from "./carDetails/carDetails";
import { ACCOUNT_ROUTER_PROVIDERS } from "./account/components/routes";
import { GUARDS } from "./shared/guards";

export const routes: Routes = [
  { path: '', component: QuickSearchComponent }, 
  { path: 'auth', loadChildren: () => System.import('./+authentication') },
  { path: 'details/:id', component: CarDetailsComponent },
  { path: 'personal', loadChildren: () => System.import('./+account') },
  { path: 'search/:maker', loadChildren: () => System.import('./+regularSearch') },
  { path: '**', redirectTo: '/' }
];

export const ROUTES_PROVIDERS: any[] = [
  ...GUARDS
];
