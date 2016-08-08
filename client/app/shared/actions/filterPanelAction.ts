import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FilterModel } from '../models';

@Injectable()
export class FilterPanelActions {

    static APPLY = 'Apply filters';
    static ADD = 'Add filter';
    static ACTIVATE = 'Activate filter';
    static DEACTIVATE = 'Deactivate filter';
    static CONVERT_FROM_ROUTE = '[FilterPanel] CONVERT FROM ROUTE';

    applyFilters(query: Array<FilterModel>): Action {
        return {
            type: FilterPanelActions.APPLY,
            payload: query
        };
    }
    convertFromRouteParams(params: any): Action {
        return {
            type: FilterPanelActions.CONVERT_FROM_ROUTE,
            payload: params
        };
    }
    addFilter(filter: FilterModel): Action {
        return {
            type: FilterPanelActions.ADD,
            payload: filter
        };
    }
    activateFilter(filter: FilterModel): Action {
        return {
            type: FilterPanelActions.ACTIVATE,
            payload: filter
        };
    }
    deactivateFilter(filter: FilterModel): Action {
        return {
            type: FilterPanelActions.DEACTIVATE,
            payload: filter
        };
    }
}
