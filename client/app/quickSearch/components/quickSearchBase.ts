import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../shared/services/backEndApi';
import { Observable, Subscription, Subject } from 'rxjs';
import { convertToRoute, construct } from '../../shared/lib/';
import * as converters from "../../shared/lib/converters";
import { FilterStateModel } from '../../shared/models';

import { AppState, getMakers, getCatalogReady } from "../../shared/reducers";
import { CatalogActions } from "../../shared/actions";
import { Store } from '@ngrx/store';

@Component({
    selector: 'quickSerch',
    template: require('./quickSearchBase.html'),
    directives: [REACTIVE_FORM_DIRECTIVES],
    styles: [require('./component.css')]
})
export class QuickSearchComponent implements OnDestroy {
    carFormModel: any = {
        maker: "",
        model: "",
        year: ""
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

    constructor(
        private apiService: Api,
        private router: Router,
        private store: Store<AppState>,
        private catalogActions: CatalogActions
    ) {
        this.form = new FormGroup({
            maker: this.maker,
            model: this.model,
            yearFrom: this.yearFrom,
            priceUp: this.priceUp
        })
    }

    ngAfterViewInit() {
        for (let i = 1980; i <= new Date().getFullYear(); i++) {
            this.yearFroms.push(i)
        }
        this.appStoreSubscr =
            this.store
                .let(getCatalogReady())
                .flatMap(() => this.store.let(getMakers()))
                .do((makers) => {
                    this.loading = true;
                    this.carMakers = makers;
                })
                .switchMap((value) => this._operateCount())
                .subscribe(this.count$);

        this.form
            .find("maker")
            .valueChanges
            .do((value) => {
                this.loading = true;
                this.carFormModel.model = '';
            })
            .switchMap((value) => {
                return Observable.zip(
                    this.apiService.getMakerModels(value.id),
                    this._operateCount({ maker: value }),
                    (models, count) => {
                        return { models: models, count: count }
                    });
            })
            .subscribe((val: any) => {
                this.carModels = val.models;
                this.count$.next(val.count);
            }, console.error);

        this.form
            .find("model")
            .valueChanges
            .do(() => { this.loading = true; })
            .switchMap((value) => this._operateCount({ model: value }))
            .subscribe(this.count$, console.error);

        this.form
            .find("priceUp")
            .valueChanges
            .debounceTime(500)
            .do(() => { this.loading = true; })
            .switchMap((value) => this._operateCount({ priceUp: value }))
            .subscribe(this.count$, console.error);

        this.form
            .find("yearFrom")
            .valueChanges
            .do(() => { this.loading = true; })
            .switchMap((value) => this._operateCount({ yearFrom: value }))
            .subscribe(this.count$, console.error);
    }

    ngOnDestroy() {
        if (this.appStoreSubscr)
            this.appStoreSubscr.unsubscribe();
    }

    _operateCount(value = {}): Observable<number> {
        var searchRequest = Object.assign({}, this.form.value, value);
        if (!!searchRequest.maker)
            searchRequest.maker = searchRequest.maker.name;
        return this.apiService.getCarsCount(searchRequest)
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
        var query = this.form.value;
        let model = new FilterStateModel();
        let searchRequest = Object.assign(model, query, { maker: query.maker.name });
        let routeParams = convertToRoute(this.convertersPipe(), searchRequest);
        const queryParams = {
            'year': routeParams.year, price: routeParams.price
        };
        this.router.navigate(['/search/', routeParams.maker, routeParams]);
    }
}
