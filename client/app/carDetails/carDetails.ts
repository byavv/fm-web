import {Component, OnInit} from '@angular/core';
import {Api} from '../shared/services';
import {ROUTER_DIRECTIVES, ActivatedRoute} from '@angular/router';
import {CAROUSEL_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
@Component({
    selector: 'carDetails',
    template: require("./carDetails.html"),
    styles: [require('./component.scss')],
    directives: [ROUTER_DIRECTIVES, CAROUSEL_DIRECTIVES]
})
export class CarDetailsComponent implements OnInit {
    car: any = {
        images: []
    };

    constructor(private apiService: Api, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.apiService
            .getCar(/*this.params.get('id')*/this.activeRoute.snapshot.params['from'])
            .subscribe((car: any) => {
                this.car = car;
            })
    }
}