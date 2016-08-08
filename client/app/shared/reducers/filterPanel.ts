import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Vehicle } from '../models';
import { FilterPanelActions } from '../actions/filterPanelAction';
import { FilterModel } from "../../shared/models/";
import * as converters from "../lib/converters";
import { construct } from "../lib/helpers";
import { ConverterBase } from "../lib/converters/ConverterBase";
import {buildFilterListFromRoute} from "../../shared/lib/";

const initialState: Array<FilterModel> = [];

function convertersPipe() {
    let convertersArray = [];
    Object.keys(converters).forEach((key) => {
        convertersArray.push(construct(converters[key]));
    });
    return convertersArray;
}

export function filterReducer(state/* = initialState*/, action: Action): Array<FilterModel> {
    switch (action.type) {

        case FilterPanelActions.APPLY: {
            return [...action.payload]
        }

        case FilterPanelActions.ADD: {
            return [...state, action.payload]
        }

        case FilterPanelActions.ACTIVATE: {
            var index = state.indexOf(action.payload);
            let filter = state[index];
            filter.active = true;
            return [
                ...state.slice(0, index),
                filter,
                ...state.slice(index + 1)
            ]
        }

        case FilterPanelActions.CONVERT_FROM_ROUTE: {
            const routeParams = action.payload;
            const converted = buildFilterListFromRoute(convertersPipe(), routeParams);
            //  return Object.assign({}, state, converted);
            return [...converted]
        }

        case FilterPanelActions.DEACTIVATE: {
            var index = state.indexOf(action.payload);
            let filter = state[index];
            filter.active = false;
            return [
                ...state.slice(0, index),
                filter,
                ...state.slice(index + 1)
            ]
        }

        default: {
            return state;
        }
    }
}

export function getFilterState() {
    return (state$: Observable<Array<FilterModel>>) => state$
        .select((state) => state)
        .filter(filter => !!filter)
}
