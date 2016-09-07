import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'usercars',
    template: `
        <div class="row">        
            <div class="col-md-12">
                <router-outlet>
                </router-outlet>
            </div>
        </div>
    `   
})

export class UserCarsBaseComponent { }
