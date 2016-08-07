import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";

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

    directives: [ROUTER_DIRECTIVES]
})

export class UserCarsComponent { }
