import {Component, OnInit, EventEmitter, Output, ViewQuery, ComponentRef, OnDestroy, QueryList, ChangeDetectorRef} from '@angular/core';
import {FilterController} from '../../services/filterController';
import {FilterWrapperComponent} from './filterWrapper'
import * as filters from './filters';
import {TotalCounter} from '../../services/totalCounter';
import {Api} from "../../../shared/services";
import {FilterModel, FilterStateModel} from "../../../shared/models";
import {LoaderComponent} from "../../../shared/components/loader/loader";
import {Subscription, Observable} from "rxjs";
import { Store } from "@ngrx/store";
import {AppState, getFilterState} from "../../../shared/reducers";
import { QueryActions } from "../../../shared/actions";
@Component({
    selector: 'carFilterPanel',
    template: require("./panelBase.html"),
    directives: [FilterWrapperComponent, LoaderComponent],
    styles: [`
        .sch-button{
            width: 100%;
            color: #fff;
            outline: none;
            background-color: #337ab7;
            border-color: #006DCC #005CAB #00559E;;
            -webkit-box-shadow: 0 1px .5px 0 rgba(0,0,0,.25);
            box-shadow: 0 1px .5px 0 rgba(0,0,0,.25);
        }
        .link{
            color: #337ab7;
            text-decoration: underline;
            cursor: pointer;
            font-size:16px;
        }
       :host >>> .form-control{
           margin:3px 0;
       }    
       .opened{
           display: block!important;
       } 
    `]
})
export class CarFilterPanelComponent implements OnInit, OnDestroy {
    filters: Array<FilterModel> = [];
    alreadyLoaded: boolean = false;
    count: number;
    pendingFilterState: any = {};
    private _counterSubscr: Subscription;
    private _filterSrvSubscr: Subscription;
    opened = false; // when resize window panel should be closed by default

    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    filterState$: Observable<any>
    constructor(
        private store: Store<AppState>,
        private queryActions: QueryActions,
        private counter: TotalCounter,
        private apiService: Api,
        @ViewQuery("wrapper") private wrappers: QueryList<FilterWrapperComponent>) { }

    ngOnInit() {
        this._counterSubscr = this.counter.subscribe((count: any) => {
            this.count = count;
        })
        this.filterState$ = this.store.let(getFilterState());
        this._filterSrvSubscr = this.filterState$           
            .subscribe((state) => {
                if (!this.alreadyLoaded) {
                    this.filters = state;
                    this.alreadyLoaded = true;
                }
            })
    }
    ngOnDestroy() {
        if (this._filterSrvSubscr)
            this._filterSrvSubscr.unsubscribe();
        if (this._counterSubscr)
            this._counterSubscr.unsubscribe();
    }

    onFilterValueChanged(newValue) {
        //  if (newValue.immidiate) {
        //   this.store.dispatch(this.queryActions.applyQueryParams(newValue.filterValue))
        // this.filterController.filterState = newValue.filterValue;
        //  this._doSearch();
        this.changed.emit(newValue.filterValue)
        //  } else {
        //     this.pendingFilterState = Object.assign(this.pendingFilterState, newValue.filterValue);
        // }
        if (this.opened) {
            //  this.apiService.getCarsCount(Object.assign(this.filterController.filterState, this.pendingFilterState))
            //      .subscribe((result: any) => {
            //           this.counter.next(+result.count);
            //       })
        }
    }

    //_doSearch() {
    //  this.changed.next(this.pendingFilterState);
    //   this.pendingFilterState = {};
    // }

    detailedSearch() {
        console.warn("This feature has not been implemented yet");
    }
    closePanel() {
        this.opened = false;
    }
    openPanel() {
        this.opened = true;
    }
}
