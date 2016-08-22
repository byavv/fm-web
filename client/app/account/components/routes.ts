import { provideRouter, RouterConfig, Route } from '@angular/router';
import { ProfileComponent } from './personal/personal';
import { AccountComponent } from './account/account';
import { MasterBaseComponent } from './userCars/masterBase';
import { UserCarsListComponent } from './userCars/carList';
import { UserCarsComponent } from './userCars/userCarsBase';
import { AccountBase } from './accountBase';

export const ACCOUNT_ROUTER_PROVIDERS: RouterConfig = [
    {
        path: 'personal',
        component: AccountBase,
        children: [
            { path: 'profile', component: ProfileComponent },
            { path: 'account', component: AccountComponent },
            {
                path: 'cars',
                component: UserCarsComponent,
                children: [
                    { path: 'master', component: MasterBaseComponent },
                    { path: 'list', component: UserCarsListComponent }
                ]
            }
        ]
    }
];
