/* tslint:disable */
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Vehicle, FilterModel } from '../../lib/models';
import { FilterPanelActions } from '../../core/actions/filterPanelAction';

import * as converters from '../../lib/converters';
import { construct } from '../../lib/helpers';
import { ConverterBase } from '../../lib/converters/ConverterBase';
import { buildFilterListFromRoute } from '../../lib';

export interface FilterState {
    filter: Array<FilterModel>;
    loaded: boolean;
};

const initialState: FilterState = {
    filter: [],
    loaded: false
};

function convertersPipe() {
    let convertersArray = [];
    Object.keys(converters).forEach((key) => {
        convertersArray.push(construct(converters[key]));
    });
    return convertersArray;
}

export function filterReducer(state = initialState, action: Action): FilterState {
    switch (action.type) {
        case FilterPanelActions.APPLY: {
            return {
                filter: [...action.payload],
                loaded: true
            };
        }
        case FilterPanelActions.ADD: {
            return {
                filter: [...state.filter, action.payload],
                loaded: true
            };
        }
        case FilterPanelActions.ACTIVATE: {
            let index = state.filter.indexOf(action.payload);
            let filter = state[index];
            filter.active = true;
            return {
                filter: [
                    ...state.filter.slice(0, index),
                    filter,
                    ...state.filter.slice(index + 1)
                ], loaded: true
            };
        }
        case FilterPanelActions.CONVERT_FROM_ROUTE: {
            const routeParams = action.payload;
            const converted = buildFilterListFromRoute(convertersPipe(), routeParams);
            //  return Object.assign({}, state, converted);
            return {
                filter: [...converted],
                loaded: true
            };
        }
        case FilterPanelActions.DEACTIVATE: {
            let index = state.filter.indexOf(action.payload);
            let filter = state[index];
            filter.active = false;
            return {
                filter: [
                    ...state.filter.slice(0, index),
                    filter,
                    ...state.filter.slice(index + 1)
                ], loaded: true
            };
        }
        default: {
            return state;
        }
    }
}

export function getFilterState() {
    return (state$: Observable<FilterState>) => state$
        .filter(state => state.loaded)
        .select((state) => state.filter);
}
