import { Component, OnInit } from '@angular/core';
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
    providers: [UsersBackEndApi],
})

export class UserCarsBaseComponent { }
