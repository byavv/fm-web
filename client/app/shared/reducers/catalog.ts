import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Catalog } from '../models';
import { CatalogActions } from '../actions/catalogAction';

export interface CataloState {
  found: any[];
  loading: boolean;
};

const initialState: CataloState = {
  found: [],
  loading: false
};

export function catalogReducer(state = initialState, action: Action): CataloState {
  switch (action.type) {
    case CatalogActions.SET: {
      const query = action.payload;
      return Object.assign(state, {
        query,
        found: [],
        loading: true
      });
    } 
    default: {
      return state;
    }
  }
}

export function getSearchProcessStatus() {
  return (state$: Observable<CataloState>) => state$
    .select(s => s.loading);
}

export function getFoundcatalogs() {
  return (state$: Observable<CataloState>) => state$
    .select(s => s.found);
}
