import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Vehicle } from '../models';
import { SearchActions } from '../actions/searchAction';

export interface SearchState {
  found: any[];
  loading: boolean;
};

const initialState: SearchState = {
  found: [],
  loading: false
};

export function vehicleReducer(state = initialState, action: Action): SearchState {
  switch (action.type) {
    case SearchActions.SEARCH: {
      const query = action.payload;
      return Object.assign(state, {
        query,
        found: [],
        loading: true
      });
    }

    case SearchActions.UPDATE: {     
      return {
        found: [...action.payload],
        loading: false
      };
    }

    case SearchActions.SEARCH_COMPLETE_SUCCESS: {
      const vehicles: Vehicle[] = action.payload;

      return {
        found: vehicles,
        loading: false
      };
    }

    case SearchActions.SEARCH_COMPLETE_ERROR: {
      return {
        found: [],
        loading: false
      };
    }

    default: {
      return state;
    }
  }
}

export function getSearchProcessStatus() {
  return (state$: Observable<SearchState>) => state$
    .select(s => s.loading);
}

export function getFoundVehicles() {
  return (state$: Observable<SearchState>) => state$
    .select(s => s.found);
}
