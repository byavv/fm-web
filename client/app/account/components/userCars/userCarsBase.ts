import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";
import { UsersBackEndApi } from "../../services/usersBackEndApi";

@Component({
    selector: 'usercars',
    template: `
        <div class="row">        
            <div class="col-md-12">
                <router-outlet>
                </router-outlet>
            </div>
        </div>
    `,

    directives: [ROUTER_DIRECTIVES],
    providers: [UsersBackEndApi],
})

export class UserCarsComponent { }
