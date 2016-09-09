import { Component, OnInit } from '@angular/core';
import { CarApi } from '../../../shared/services';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'carDetails',
    template: require("./carDetails.html"),
    styles: [require('./component.scss')]
})
export class CarDetailsComponent implements OnInit {
    car: any = {
        images: []
    };

    constructor(private apiService: CarApi, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.apiService
            .findById(this.activeRoute.snapshot.params['id'])
            .subscribe((car: any) => {
                this.car = car;
            });
    }
}
