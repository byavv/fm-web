import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import { vehicleReducer, VehicleState }  from './vehicle';
import * as vehicle  from './vehicle';
import * as query  from './query';
import * as filter  from './filter';
import * as catalog  from './catalog';
import { filterReducer }  from './filter';
import { queryReducer, SearchQueryState }  from './query';
import { catalogReducer, CatalogState }  from './catalog';
import { FilterStateModel, FilterModel, Catalog } from '../models';

export interface AppState {
  vehicle: VehicleState,
  filter: FilterModel,
  query: SearchQueryState,
  catalog: CatalogState
}

export default combineReducers({
  vehicle: vehicleReducer,
  filter: filterReducer,
  query: queryReducer,
  catalog: catalogReducer
});

export function getVehicleState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.vehicle);
}

export function getFilterState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.filter)
}

export function getCatalogState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.catalog)
}

export function getQueryState() {
  return (state$: Observable<AppState>) => state$
    .select(s => s.query)
}

export function getMakers() {
  return compose(catalog.getCurrentMakers(), getCatalogState());
}

export function getEngineTypes() {
  return compose(catalog.getCurrentEngineTypes(), getCatalogState());
}

export function getCatalogReady() {
  return compose(catalog.catalogInit(), getCatalogState());
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
