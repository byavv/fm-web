import { provideRouter, RouterConfig, Route } from '@angular/router';
import { ProfileComponent } from './personal/personal';
import { AccountComponent } from './account/account';
import { MasterBaseComponent } from './userCars/masterBase';
import { UserCarsListComponent } from './userCars/carList';
import { UserCarsComponent } from './userCars/userCarsBase';

export const ACCOUNT_ROUTER_PROVIDERS: RouterConfig = [
    { path: 'profile', component: ProfileComponent },
    { path: 'account', component: AccountComponent },
    {
        path: 'cars',
        component: UserCarsComponent,
        children: [
            { path: 'master/:id', component: MasterBaseComponent },
            { path: 'list', component: UserCarsListComponent }
        ]
    }
];
