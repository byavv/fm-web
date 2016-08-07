import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import { vehicleReducer, SearchState }  from './vehicleSearch';
import * as search  from './vehicleSearch';
import { filterReducer, FilterState }  from './filterPanel';
import { queryReducer, QueryState }  from './routeQuery';

export interface AppState {
  search: SearchState,
  filter: FilterState,
  query: QueryState
}

export default combineReducers({
  search: vehicleReducer,
  filter: filterReducer,
  query: queryReducer
});

export function getSearchState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.search);
}

export function getFilterState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.filter);
}

export function getQueryState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.query);
}


export function getFoundVehicles() {
  return compose(search.getFoundVehicles(), getSearchState());
}
export function getSearchProcessStatus() {
  return compose(search.getSearchProcessStatus(), getSearchState());
}
