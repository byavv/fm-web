import { Component, OnInit } from '@angular/core';
import { UsersBackEndApi } from "../../services/usersBackEndApi";
import { Car } from '../../../lib/models';
import { LoaderComponent } from "../../../shared/components/loader/loader";
import { ReplaySubject, Observable } from 'rxjs';

@Component({
    selector: 'carList',
    template: require('./carList.html'),
    styles: [require('./steps/styles/carList.css')]
})
export class UserCarsListComponent implements OnInit {
    cars = [];
    loading: boolean;
    operateCars$: ReplaySubject<any> = new ReplaySubject();
    constructor(private api: UsersBackEndApi) { }
    ngOnInit() {
        this.loading = true;
        this.operateCars$
            .flatMap(() => this.api.getUserCars())
            .subscribe((cars: Array<any>) => {
                this.cars = cars;
                this.loading = false;
            })
        this.operateCars$.next('init');
    }
    // delete and update
    deleteCar(car: Car) {
        this.loading = true;
        this.api.deleteCar(car.id)
            .subscribe((res) => {
                this.operateCars$.next(res);
            }, err => {
                console.error(err);
            })
    }
}
