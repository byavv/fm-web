import { Component, OnInit } from '@angular/core';
import { Car } from '../../../lib/models';
import { LoaderComponent } from "../../../shared/components/loader/loader";
import { ReplaySubject, Observable } from 'rxjs';
import { CarApi } from '../../../shared/services';

@Component({
    selector: 'carList',
    template: require('./carList.html'),
    styles: [require('./steps/styles/carList.css')]
})
export class UserCarsListComponent implements OnInit {
    cars = [];
    loading: boolean;
    operateCars$: ReplaySubject<any> = new ReplaySubject();
    constructor(private carApi: CarApi) { }
    ngOnInit() {
        this.loading = true;
        this.operateCars$
            .flatMap(() => this.carApi.getCarsByPrinciple())
            .subscribe((cars: Array<any>) => {
                this.cars = cars;
                this.loading = false;
            })
        this.operateCars$.next('init');
    }
    // delete and update
    deleteCar(car: Car) {
        this.loading = true;
        this.carApi.deleteById(car.id)
            .subscribe((res) => {
                this.operateCars$.next(res);
            }, err => {
                console.error(err);
            })
    }
}
