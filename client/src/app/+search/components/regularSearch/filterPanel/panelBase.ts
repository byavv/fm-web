import {
    Component, OnInit,
    EventEmitter,
    Output, ViewChild,
    OnDestroy, QueryList
} from '@angular/core';
import { FilterWrapperComponent } from './filterWrapper';
import * as filters from './filters';
import { TotalCounter } from '../../../services';
import { FilterModel, FilterStateModel } from "../../../../lib/models";
import { LoaderComponent } from "../../../../shared/components/loader/loader";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState, getFilter } from "../../../../core/reducers";
import { QueryActions } from "../../../../core/actions";

@Component({
    selector: 'carFilterPanel',
    template: require("./panelBase.html"),
    styles: [`
        .sch-button {
            width: 100%;
            color: #fff;
            outline: none;
            background-color: #337ab7;
            border-color: #006DCC #005CAB #00559E;;
            -webkit-box-shadow: 0 1px .5px 0 rgba(0,0,0,.25);
            box-shadow: 0 1px .5px 0 rgba(0,0,0,.25);
        }
        .link {
            color: #337ab7;
            text-decoration: underline;
            cursor: pointer;
            font-size:16px;
        }
        :host >>> .form-control {
            margin:3px 0;
        }    
        .opened {
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
    filterState$: Observable<any>;
    @ViewChild(FilterWrapperComponent) wrappers: QueryList<FilterWrapperComponent>;
    constructor(
        private store: Store<AppState>,
        private queryActions: QueryActions,
        private counter: TotalCounter) { }

    ngOnInit() {
        this._counterSubscr = this.counter.subscribe((count: any) => {
            this.count = count;
        })
        this.filterState$ = this.store.let(getFilter());
        this._filterSrvSubscr = this.filterState$
            .subscribe((state) => {
                if (!this.alreadyLoaded) {
                    this.filters = state;
                    this.alreadyLoaded = true;
                }
            });
    }
    ngOnDestroy() {
        if (this._filterSrvSubscr)
            this._filterSrvSubscr.unsubscribe();
        if (this._counterSubscr)
            this._counterSubscr.unsubscribe();
    }
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
