import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import { vehicleReducer, VehicleState }  from './vehicleSearch';
import * as vehicle  from './vehicleSearch';
import * as query  from './routeQuery';
import * as filter  from './filterPanel';
import { filterReducer }  from './filterPanel';
import { queryReducer, SearchQueryState }  from './routeQuery';
import { FilterStateModel, FilterModel } from '../models';

export interface AppState {
  vehicle: VehicleState,
  filter: FilterModel,
  query: SearchQueryState
}

export default combineReducers({
  vehicle: vehicleReducer,
  filter: filterReducer,
  query: queryReducer
});

export function getVehicleState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.vehicle);
}

export function getFilterState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.filter)    
}

export function getQueryState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.query)   
}

export function getQuery() {
  return compose(query.getQuery(), getQueryState());
}

export function getFilter() {
  return compose(filter.getFilterState(), getFilterState());
}

export function getConvertedToRouteParamsQuery() {
  return compose(query.getConvertedToRouteQueryState(), getQueryState());
}


export function getFoundVehicles() {
  return compose(vehicle.getFoundVehicles(), getVehicleState());
}

export function getSearchProcessStatus() {
  return compose(vehicle.getSearchProcessStatus(), getVehicleState());
}
