import { Component, OnInit } from '@angular/core';
import { CarApi } from '../../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, Subscription } from "rxjs";

import { TotalCounter } from '../../services';
import { Store } from "@ngrx/store";

import {
    AppState, getVehicleState,
    getFoundVehicles, getFilter,
    getQuery, getCatalogReady,
    getConvertedToRouteParamsQuery
} from "../../../core/reducers";

import {
    QueryActions,
    FilterPanelActions,
    VehicleActions
} from "../../../core/actions";

@Component({
    selector: 'carSearch',
    template: require('./regularSearchBase.html'),
    styles: [require('./component.scss')]
})
export class RegularSearchBase implements OnInit {
    totalCount: number;
    loading: boolean;
    search
    found$: Observable<any>;
    state$: Observable<any>
    routSbscr: Subscription;
    constructor(
        private apiService: CarApi,
        private router: Router,
        private route: ActivatedRoute,
        private totalCounter: TotalCounter,
        private store: Store<AppState>,
        private vehicleActions: VehicleActions,
        private queryActions: QueryActions,
        private filterPanelActions: FilterPanelActions
    ) {
        this.found$ = store.let(getFoundVehicles());
        this.state$ = Observable
            .zip(store.let(getFilter()), store.let(getQuery()));
    }

    ngOnInit() {
        this.routSbscr = this.route.params
            .subscribe((params) => {
                this.store.dispatch(this.queryActions.updateStateFromRouteParams(params));
                this.store.dispatch(this.filterPanelActions.updateStateFromRouteParams(params));
            });

        this.store.let(getQuery())
            .subscribe(state => {
                this._search(state);
            });

        this.store.let(getConvertedToRouteParamsQuery())
            .filter(state => {
                return state.navigate;
            })
            .map(state => {
                return state.route;
            })
            .subscribe((routeParams) => {
                if (!!routeParams) {
                    this.router.navigate(['/search/', routeParams]/*, { queryParams: routeParams }*/);
                }
            });
    }

    ngOnDestroy() {
        this.routSbscr.unsubscribe();
    }

    private _search(filter) {
        this.loading = true;
        Observable.zip(
            this.apiService
                .search(filter),
            this.apiService
                .count(filter),
            (cars, count) => [cars, count])
            .subscribe((result: any) => {
                if (result) {
                    this.totalCount = +result[1].count;
                    this.totalCounter.next(this.totalCount);
                    this.store.dispatch(this.vehicleActions.searchComplete(result[0]));
                }
            }, err => {
                this.store.dispatch(this.vehicleActions.searchError(err));
            })
    }

    doSearch(value) {
        this.store.dispatch(this.queryActions.updateStateFromFilterChange(value));
    }
}
