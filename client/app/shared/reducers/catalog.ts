import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Catalog } from '../models';
import { CatalogActions } from '../actions/catalogAction';

export interface CatalogState {
    catalogId: string,
    engineTypes: Array<any>
    makers: Array<any>,
    init: boolean
};

const initialState: CatalogState = {
    catalogId: null,
    engineTypes: [],
    makers: [],
    init: false
};

export function catalogReducer(state = initialState, action: Action): CatalogState {
    switch (action.type) {
        case CatalogActions.CHANGE_CATALOG: {
            const catalog = action.payload;
            return Object.assign({}, state, {
                catalog: catalog,
                init: true
            });
        }
        case CatalogActions.CHANGE_LOOKUPS: {
            const lookups = action.payload;
            return Object.assign({}, state, {
                engineTypes: lookups.engineTypes,
                makers: lookups.makers,
                init: true
            });
        }
        default: {
            return state;
        }
    }
}

export function getCurrentEngineTypes() {
    return (state$: Observable<CatalogState>) => state$
        .select(s => s.engineTypes);
}

export function getCurrentMakers() {
    return (state$: Observable<CatalogState>) => state$
        .select(s => s.makers);
}


export function catalogInit() {
    return (state$: Observable<CatalogState>) => state$
        .filter(state => state.init)
}