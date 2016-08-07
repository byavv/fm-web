import {Component, OnInit} from '@angular/core';
import {Api} from '../../shared/services';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Observable} from "rxjs";

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

import {AppState, getSearchState, getFoundVehicles} from "../../shared/reducers";
import {SearchActions} from "../../shared/actions/searchAction";

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
   // found$: Subject<Array<any>> = new Subject<Array<any>>();
    totalCount: number;
    loading: boolean;
    search
    found$: Observable<any>;
    constructor(
        private apiService: Api,
        private router: Router,
        // private params: RouteParams,
        private activatedRoute: ActivatedRoute,
        private filterController: FilterController,
        private totalCounter: TotalCounter,
        private appController: AppController,
        private store: Store<AppState>,
        private searchActions: SearchActions
    ) {
        this.found$ = store.let(getFoundVehicles());   
        store.let(getSearchState()).subscribe((value)=>{
            console.log(value)
        }) 
        
    }

    /*  routerCanReuse() {
          return true;
      }*/
    /* routerOnReuse(instruction: ComponentInstruction) {
         this.appController.init$.subscribe(() => {
             this._search(this.filterController.updateStateFromRoute(instruction.params));
         })
     }*/
    ngOnInit() {
        // first time 
        this.router.routerState.queryParams.skip(1).subscribe(params => {
            this._search(this.filterController.updateStateFromRoute(Object.assign({}, params)));
            //  this._search(this.filterController.updateStateFromRoute(Object.assign({}, this.activatedRoute.snapshot.params, this.router.routerState.snapshot.queryParams)/*this.params.params*/));
        })
        this.activatedRoute.params.subscribe((params) => {
            console.log(params)
        })
        this.appController.init$.subscribe(() => {
            this._search(this.filterController.updateStateFromRoute(Object.assign(this.activatedRoute.snapshot.params, this.router.routerState.snapshot.queryParams)/*this.params.params*/));
        })
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
                   // this.found$.next(result[0]);
                    this.store.dispatch(this.searchActions.update(result[0]));
                }
            }, err => {
                console.log(err);
            })
    }
    // happens when any filter value changes
    doSearch(value) {
        if (value) {            
            this.filterController.filterState = value;
            const searchPrams = this.filterController.convertToRouteParams();
            this.router.navigate(['/search/', searchPrams.maker], { queryParams: searchPrams });
        }
    }
}
