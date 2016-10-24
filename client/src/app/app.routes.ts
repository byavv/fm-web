import { Routes, RouterModule } from '@angular/router';
import { AuthenticationBase } from './+authentication/components/authBase';
import { QuickSearchComponent } from "./--home/landingForm/quickSearchBase";
import { Err404 } from "./--err404";


export const routes: Routes = [
  { path: '', component: QuickSearchComponent },
  {
    path: 'auth', loadChildren: () => System.import('./+authentication')
      .then((comp: any) => {
        return comp.default;
      })
  },
  {
    path: 'personal', loadChildren: () => System.import('./+account')
      .then((comp: any) => {
        return comp.default;
      })
  },
  {
    path: 'search', loadChildren: () => System.import('./+search')
      .then((comp: any) => {
        return comp.default;
      })
  },
  { path: '**', component: Err404 }
];
