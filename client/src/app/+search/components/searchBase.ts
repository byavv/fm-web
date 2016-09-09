import { Component } from '@angular/core';

@Component({
    selector: 'search',
    template: ` 
        <div class="row">            
            <div class="col-md-12 col-sm-12">           
                <router-outlet>
                </router-outlet>               
            </div>
        </div>
   `,
})
export class SearchBase { }
