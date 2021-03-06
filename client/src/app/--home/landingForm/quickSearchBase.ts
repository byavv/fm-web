import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MakerApi, CarApi } from '../../shared/services';
import { Observable, Subscription, Subject } from 'rxjs';
import { convertToRoute, construct } from '../../lib/';
import * as converters from '../../lib/converters';
import { FilterStateModel } from '../../lib/models';

import { AppState, getMakers, getCatalogReady } from '../../core/reducers';
import { CatalogActions } from '../../core/actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'quickSearch',
    template: require('./quickSearchBase.html'),
    styles: [require('./component.css')]
})
export class QuickSearchComponent implements OnDestroy {
    carFormModel: any = {
        maker: '',
        model: '',
        year: ''
    };

    carMakers: Array<any> = [];
    carModels: Array<any> = [];
    yearFroms: Array<number> = [];
    count$: Subject<number> = new Subject<number>();
    form: FormGroup;
    carCount: any;
    loading: boolean = true;
    appStoreSubscr: Subscription;

    yearFrom: FormControl = new FormControl();
    priceUp: FormControl = new FormControl();
    model: FormControl = new FormControl();
    maker: FormControl = new FormControl();
    ready$: Observable<any>;
    constructor(
        private makerApi: MakerApi,
        private carApi: CarApi,
        private router: Router,
        private store: Store<AppState>,
        private catalogActions: CatalogActions
    ) {
        this.form = new FormGroup({
            maker: this.maker,
            model: this.model,
            yearFrom: this.yearFrom,
            priceUp: this.priceUp
        });
    }

    ngAfterViewInit() {
        for (let i = 1980; i <= new Date().getFullYear(); i++) {
            this.yearFroms.push(i);
        }

        this.ready$ = this.store
            .let(getCatalogReady());

        this.appStoreSubscr = this.ready$
            .do(() => { console.log('--------------Catalog ready----------------'); })
            .flatMap(() => this.store.let(getMakers()))
            .do((makers: any) => {
                this.loading = true;
                this.carMakers = makers;
            })
            .switchMap((value) => this._operateCount())
            .subscribe(this.count$);

        this.form
            .controls['maker']
            .valueChanges
            .do((value: any) => {
                this.loading = true;
                this.carFormModel.model = '';
            })
            .switchMap((value) => {
                return Observable.zip(
                    this.makerApi.getCarModels(value.id),
                    this._operateCount({ maker: value }),
                    (models, count) => {
                        return { models: models, count: count };
                    });
            })
            .subscribe((val: any) => {
                this.carModels = val.models;
                this.count$.next(val.count);
            }, console.error);

        this.form
            .controls['model']
            .valueChanges
            .do(() => { this.loading = true; })
            .switchMap((value: any) => this._operateCount({ model: value }))
            .subscribe(this.count$, console.error);

        this.form
            .controls['priceUp']
            .valueChanges
            .debounceTime(500)
            .do(() => { this.loading = true; })
            .switchMap((value: any) => this._operateCount({ priceUp: value }))
            .subscribe(this.count$, console.error);

        this.form
            .controls['yearFrom']
            .valueChanges
            .do(() => { this.loading = true; })
            .switchMap((value: any) => this._operateCount({ yearFrom: value }))
            .subscribe(this.count$, console.error);
    }

    ngOnDestroy() {
        if (this.appStoreSubscr)
            this.appStoreSubscr.unsubscribe();
    }

    _operateCount(value = {}): Observable<number> {
        let searchRequest = Object.assign({}, this.form.value, value);
        if (!!searchRequest.maker)
            searchRequest.maker = searchRequest.maker.name;
        return this.carApi.count(searchRequest)
            .finally(() => { this.loading = false; })
            .map((count: any) => +count.count);
    }

    convertersPipe() {
        let convertersArray = [];
        Object.keys(converters).forEach((key) => {
            convertersArray.push(construct(converters[key]));
        });
        return convertersArray;
    }

    submit() {
        let query = this.form.value;
        let model = new FilterStateModel();
        let searchRequest = Object.assign(model, query, { maker: query.maker.name });
        let routeParams = convertToRoute(this.convertersPipe(), searchRequest);
        const queryParams = {
            'year': routeParams.year, price: routeParams.price
        };
        this.router.navigate(['/search/', routeParams]);
    }
}
