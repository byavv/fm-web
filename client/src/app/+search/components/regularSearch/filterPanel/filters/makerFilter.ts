import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MakerApi } from '../../../../../shared/services/';
import { Observable, Subscription } from 'rxjs';
import {
    ConverterProvider, convertToView,
    FilterComponent, MakerConverter
} from '../../../../../lib/';
import { isString, isBlank } from '@angular/compiler/src/facade/lang';
import { FilterController } from '../../../../services';
import { AppState, getMakers } from "../../../../../core/reducers";
import { QueryActions, FilterPanelActions, CatalogActions } from "../../../../../core/actions";
import { Store } from '@ngrx/store';

@Component({
    selector: 'makerWrapper',
    template: require("./makerFilter.html")
})

@ConverterProvider({
    bindWith: MakerConverter
})
export class MakerFilterComponent extends FilterComponent {
    @Input()
    active: boolean;
    form: FormGroup;
    maker;
    model;
    _filterValue: any = {}
    @Input()
    get filterValue(): any {
        return this._filterValue;
    }
    set filterValue(value) {
        Object.assign(this._filterValue, value);
    }

    @Output()
    changed: EventEmitter<any> = new EventEmitter();

    carMakers: any[];
    models: any[];
    alreadyLoaded: boolean = false;
    makerControl: FormControl = new FormControl();
    modelControl: FormControl = new FormControl();
    loading: boolean = false;
    opened: boolean = false;
    valueView: string;
    oldValue: any;
    subscription: Subscription;

    constructor(private makerApi: MakerApi,
        filterController: FilterController,
        private store: Store<AppState>,
        private catalogActions: CatalogActions
    ) {
        super(filterController);
        this.form = new FormGroup({
            maker: this.makerControl,
            model: this.modelControl
        });
    }

    ngAfterViewInit() {
        this.store.let(getMakers()).subscribe((makers) => {
            this.carMakers = makers;
            this._resetView();
        });

        this.makerControl
            .valueChanges
            .distinctUntilChanged()
            .do(() => { this.loading = true })
            .switchMap((value: any) => (value && value.id) ? this.makerApi.getCarModels(value.id) : Observable.of([]))
            .subscribe((models: Array<any>) => {
                this.loading = false;
                this.models = models || [];
                this.model = this.models.find((model) => model.name == this.filterValue.model) || '';
                this.filterValue = { maker: this.maker ? this.maker.name : '' }
            });

        this.modelControl
            .valueChanges
            .distinctUntilChanged()
            .subscribe(model => {
                // model may be undefined or '', the latter is correct for 'any' value
                if (model != undefined)
                    this.filterValue = { model: this.model ? this.model.name : '' }
            });
    }

    _resetView() {
        if (this.carMakers) {
            this.maker = this.carMakers.find(maker => maker.name == this.filterValue.maker) || '';
        }
        if (this.models) {
            this.model = this.models.find((model) => model.name == this.filterValue.model) || '';
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    @convertToView
    get viewValue() {
        return this.filterValue;
    }

    openFilter() {
        this.opened = true;
        this.oldValue = Object.assign({}, this.filterValue);
    }

    applyFilter() {
        this.changed.next({ filterValue: this.filterValue, immidiate: true });
        this.opened = false;
    }

    closeFilter() {
        this.filterValue = this.oldValue;
        this._resetView();
        this.opened = false;
    }

    resetFilter() {
        this.filterValue.model = this.filterValue.maker = null;
        this.changed.next({ filterValue: this.filterValue, immidiate: true });
    }
    setValue(value) {
        this.filterValue = value;
        this.changed.next({ filterValue: this.filterValue, immidiate: true });
    }
}
