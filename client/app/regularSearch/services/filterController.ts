import {Injectable} from '@angular/core';
import {ReplaySubject, Observable} from 'rxjs';
import {convertFromRoute, convertToRoute, buildFilterListFromRoute} from "../../shared/lib/";
import {ConverterBase} from "../../shared/lib/converters/ConverterBase";
import {AppController} from "../../shared/services/";
import {FilterModel, FilterStateModel} from "../../shared/models/";

@Injectable()
export class FilterController {
    private _currentState: FilterStateModel = new FilterStateModel();
    private _filters: Array<FilterModel> = [];
    private _converters: Array<ConverterBase> = [];
    resetFilter$: ReplaySubject<any> = new ReplaySubject<any>();

    constructor(private appController: AppController) {
     //   this._converters = appController.converters;
    }

  /*  public set filterState(value: FilterStateModel) {
        Object.assign(this._currentState, value);
    }
    public get filterState(): FilterStateModel {
        return this._currentState;
    }

    public get filters(): Array<FilterModel> {
        return this._filters;
    }
    public set filters(value: Array<FilterModel>) {
        this._filters = value;
    }*/

   /* public updateStateFromRoute(params): any {
        this.filterState = convertFromRoute(this._converters, params);
        return this.filterState;
    }

    public buildFilterPanelFromState(params): any {
        this.filters = buildFilterListFromRoute(this._converters, params);
        return this.filters;
    }

    public convertToRouteParams(): any {
        return convertToRoute(this._converters, this.filterState);
    }*/
}
