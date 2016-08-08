import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Vehicle } from '../models';
import { QueryActions } from '../actions/queryAction';
import { FilterStateModel, IFilterStateModel } from "../../shared/models/";
import {convertFromRoute, convertToRoute, buildFilterListFromRoute} from "../../shared/lib/";
import * as converters from "../lib/converters";
import { construct } from "../lib/helpers";
import { ConverterBase } from "../lib/converters/ConverterBase";


export interface SearchQueryState {
    query: IFilterStateModel,
    navigate: boolean
};

const initialState: SearchQueryState = {
    query: {},
    navigate: false
};

function convertersPipe() {
    let convertersArray = [];
    Object.keys(converters).forEach((key) => {
        convertersArray.push(construct(converters[key]));
    });
    return convertersArray;
}

export function queryReducer(state = initialState, action: Action): SearchQueryState {
    switch (action.type) {
        case QueryActions.CONVERT_FROM_ROUTE: {
            const query = action.payload;
            const converted = convertFromRoute(convertersPipe(), query);
            return Object.assign({}, state, {
                query: converted,
                navigate: false
            });
        }
        case QueryActions.UPDATE_VALUE: {
            const newValue = action.payload;
            Object.assign(state.query, newValue)
            return Object.assign({}, state, {
                navigate: true
            });
        }
        default: {
            return state;
        }
    }
}

export function getConvertedToRouteQueryState() {
    return (state$: Observable<SearchQueryState>) => state$
        .map(s => {
            return {
                route: convertToRoute(convertersPipe(), s.query),
                navigate: s.navigate
            }
        })
}

export function getQuery() {
    return (state$: Observable<SearchQueryState>) => state$
        .select((state) => state.query)
}
