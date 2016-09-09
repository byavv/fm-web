import { Routes, RouterModule } from '@angular/router';
import { AuthenticationBase } from './+authentication/components/authBase';
import { QuickSearchComponent } from "./--home/landingForm/quickSearchBase";
import { Err404 } from "./--err404";


export const routes: Routes = [
  { path: '', component: QuickSearchComponent },
  { path: 'auth', loadChildren: () => System.import('./+authentication') },
  { path: 'personal', loadChildren: () => System.import('./+account') },
  { path: 'search', loadChildren: () => System.import('./+search') },
  { path: '**', component: Err404 }
];
