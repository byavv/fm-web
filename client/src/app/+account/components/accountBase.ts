import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
export class AccountBase { }
