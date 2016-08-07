import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Vehicle } from '../models';
import { QueryActions } from '../actions/queryAction';
import { FilterStateModel } from "../../shared/models/";

export interface QueryState {
    query: FilterStateModel
};

const initialState: QueryState = {
    query: new FilterStateModel()
};

export function queryReducer(state = initialState, action: Action): QueryState {
    switch (action.type) {
        case QueryActions.UPDATE: {
            const query = action.payload;

            return Object.assign(state, {
                query
            });
        }

        default: {
            return state;
        }
    }
}
