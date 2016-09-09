import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'authentication',
    template: ` 
        <div class="row">            
            <div class="col-md-12 col-sm-12">           
                <router-outlet>
                </router-outlet>               
            </div>
        </div>
   `, 
})
export class AuthenticationBase { }
