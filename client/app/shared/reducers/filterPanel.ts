import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Vehicle } from '../models';
import { FilterPanelActions } from '../actions/filterPanelAction';
import { FilterModel } from "../../shared/models/";

export interface FilterState {
    filters: Array<FilterModel>
};

const initialState: FilterState = {
    filters: []
};

export function filterReducer(state = initialState, action: Action): FilterState {
    switch (action.type) {
        case FilterPanelActions.UPDATE: {
            state.filters = [...action.payload];
            return state
        }
        case FilterPanelActions.ADD: {
            state.filters = state.filters.concat([action.payload]);
            return state
        }
        case FilterPanelActions.ACTIVATE: {
            var index = state.filters.indexOf(action.payload);
            let filter = state.filters[index];
            filter.active = true;

            state.filters = [
                ...state.filters.slice(0, index),
                filter,
                ...state.filters.slice(index + 1)
            ]
            return state
        }
        case FilterPanelActions.DEACTIVATE: {
            var index = state.filters.indexOf(action.payload);
            let filter = state.filters[index];
            filter.active = false;

            state.filters = [
                ...state.filters.slice(0, index),
                filter,
                ...state.filters.slice(index + 1)
            ]
            return state
        }
        default: {
            return state;
        }
    }
}
