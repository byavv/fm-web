import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import { vehicleReducer, VehicleState }  from './vehicle';
import * as vehicle  from './vehicle';
import * as query  from './query';
import * as filter  from './filter';
import { filterReducer }  from './filter';
import { queryReducer, SearchQueryState }  from './query';
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
