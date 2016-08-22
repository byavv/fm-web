import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from "@angular/router";
import { UsersBackEndApi } from "../services/usersBackEndApi";
import { AuthApi } from "../../shared/services/authBackEndApi";
import { Subscription } from "rxjs";

@Component({
    selector: 'settings',
    template: ` 
        <div class="row">
            <div class="col-md-2 col-sm-12 padding-shrink-right">   
                <div class="card">                      
                    <ul class="list-group list-group-flush">    
                        <a class="list-group-item" [routerLink]="['cars/list']" routerLinkActive="active">My Cars</a>
                        <a class="list-group-item" [routerLink]="['profile']" routerLinkActive="active">Profile</a>
                        <a class="list-group-item" [routerLink]="['account']" routerLinkActive="active">Account</a>
                    </ul>
                </div>                     
            </div>
            <div class="col-md-10 col-sm-12 padding-shrink-left">           
                <router-outlet>
                </router-outlet>               
            </div>
        </div>
   `,    
    directives: [ROUTER_DIRECTIVES],
    providers: [UsersBackEndApi],
    styles: [`                            
        :host >>> .info-panel{
            padding: 7px 15px;    
            color: white;
        }
        :host >>> .info-panel.error{
            background-color: #E47F6E;          
        }
        :host >>> .info-panel.info{
            background-color: #6ECEE4;
        }        
      
    `]
})
/*@RouteConfig([
    { path: '/profile', name: 'Profile', component: ProfileComponent },
    { path: '/account', name: 'Account', component: AccountComponent },
    { path: '/cars/...', name: 'MyCars', component: UserCarsComponent, useAsDefault: true }
])*/
export class AccountBase implements OnInit, OnDestroy {
    private _subscr: Subscription;

    constructor(private authBackEnd: AuthApi) { }
    ngOnInit() { 
        this._subscr = this.authBackEnd.authorize().subscribe(() => { });
    }  

    ngOnDestroy() {
        if (this._subscr)
            this._subscr.unsubscribe();
    }
}