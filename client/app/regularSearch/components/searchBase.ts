import {Component, OnInit} from '@angular/core';
import {Api} from '../../shared/services';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Observable, Subscription} from "rxjs";

import {AppController} from "../../shared/services";
import {CarFilterPanelComponent} from './filterPanel/panelBase';
import {LoaderComponent} from "../../shared/components/loader/loader";
import {SEARCH_SERVICES_PROVIDERS, FilterController, TotalCounter} from '../services/';
import {CarsListComponent} from './resultsPanel/carList/carList';
import {PaginationComponent} from './resultsPanel/pageSelector/searchPagination';
import {StateFullComponent} from './resultsPanel/filterStatePanel/stateFull';
import {StateSummaryPanel} from './resultsPanel/filterStatePanel/stateSummary';
import {LastAddedComponent} from './lastAddedPanel/components/lastAdded';
import {ScrollSpy} from "../directives/scrollSpy";
import {ResizeSpy} from '../directives/resizeSpy';
import {StickyPanel} from "../directives/sticky";
import {SizeSpy} from "../directives/rectSpy";
import { Store } from "@ngrx/store";

import {AppState, getVehicleState, getFoundVehicles, getFilterState, getQuery, getQueryState, getConvertedToRouteParamsQuery} from "../../shared/reducers";
import { QueryActions, FilterPanelActions, VehicleActions} from "../../shared/actions";

@Component({
    selector: 'carSearch',
    template: require('./searchBase.html'),
    directives: [
        CarsListComponent,
        CarFilterPanelComponent,
        StateFullComponent,
        PaginationComponent,
        LoaderComponent,
        ScrollSpy,
        LastAddedComponent,
        StickyPanel,
        ResizeSpy,
        SizeSpy,
        StateSummaryPanel
    ],
    providers: [SEARCH_SERVICES_PROVIDERS],
    styles: [require('./component.scss')]
})
export class CarsSearchComponent implements /*OnReuse,*/ OnInit {
    totalCount: number;
    loading: boolean;
    search
    found$: Observable<any>;
    state$: Observable<any>;
    routSbscr: Subscription;
    routSbscr2: Subscription;
    constructor(
        private apiService: Api,
        private router: Router,
        private route: ActivatedRoute,
        private filterController: FilterController,
        private totalCounter: TotalCounter,
        private appController: AppController,
        private store: Store<AppState>,
        private vehicleActions: VehicleActions,
        private queryActions: QueryActions,
        private filterPanelActions: FilterPanelActions
    ) {
        this.found$ = store.let(getFoundVehicles());
        this.state$ = Observable
            .zip(store.let(getFilterState()), store.let(getQuery()));
    }

    ngOnInit() {
        /* this.router.routerState.queryParams.skip(1)..subscribe(params => {
             const routeQuery = Object.assign({}, params);
             this.store.dispatch(this.queryActions.convertFromRouteParams(routeQuery));
             this.store.dispatch(this.filterPanelActions.convertFromRouteParams(routeQuery));
         })*/
        this.routSbscr2 = this.route.params
            .delayWhen(() => this.appController.init$)
            .subscribe((params) => {
                const routeQuery = Object.assign({}, params);
                this.store.dispatch(this.queryActions.updateStateFromRouteParams(routeQuery));
                this.store.dispatch(this.filterPanelActions.updateStateFromRouteParams(routeQuery));
            })

        /* this.routSbscr = this.router.routerState
             .queryParams
             // .concatMapTo(this.appController.init$, (params, defaults)=>{
             //     return params
             //  })
             .delayWhen(() => this.appController.init$)
             //  .filter(params=>!!params['maker'])
             .subscribe(params => {
                 const routeQuery = Object.assign({}, params);
                 this.store.dispatch(this.queryActions.updateStateFromRouteParams(routeQuery));
                 this.store.dispatch(this.filterPanelActions.updateStateFromRouteParams(routeQuery));
             });*/
        // search vehicles as soon as inner query state changes
        this.store.let(getQuery())
            .subscribe(state => {
                this._search(state);
            });

        this.store.let(getConvertedToRouteParamsQuery())
            .filter(state => {
                return state.navigate
            })
            .map(state => {
                return state.route
            })
            .subscribe((routeParams) => {
                if (!!routeParams) {
                    this.router.navigate(['/search/', routeParams.maker, routeParams]/*, { queryParams: routeParams }*/);
                }
            });
    }

    ngOnDestroy() {
        //  this.routSbscr.unsubscribe();
        this.routSbscr2.unsubscribe();
    }

    private _search(filter) {
        this.loading = true;
        Observable.zip(
            this.apiService
                .searchCars(filter),
            this.apiService
                .getCarsCount(filter),
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
    // happens when any filter value changes
    doSearch(value) {
        // if (!!value) {
        this.store.dispatch(this.queryActions.updateStateFromFilterChange(value));
        //  }
    }
}
