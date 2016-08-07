import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { FilterModel } from '../models';

@Injectable()
export class FilterPanelActions {

    static UPDATE = 'Update panel';
    static ADD = 'Add filter';
    static ACTIVATE = 'Activate filter';
    static DEACTIVATE = 'Deactivate filter';

    update(query: Array<FilterModel>): Action {
        return {
            type: FilterPanelActions.UPDATE,
            payload: query
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
