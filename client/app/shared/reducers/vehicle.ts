import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Vehicle } from '../models';
import { VehicleActions } from '../actions/vehicleAction';

export interface VehicleState {
  found: any[];
  loading: boolean;
};

const initialState: VehicleState = {
  found: [],
  loading: false
};

export function vehicleReducer(state = initialState, action: Action): VehicleState {
  switch (action.type) {
    case VehicleActions.SEARCH: {
      const query = action.payload;
      return Object.assign(state, {
        query,
        found: [],
        loading: true
      });
    }

    case VehicleActions.SEARCH_COMPLETE_SUCCESS: {
      const vehicles: Vehicle[] = [...action.payload];
      return {
        found: vehicles,
        loading: false
      };
    }

    case VehicleActions.SEARCH_COMPLETE_ERROR: {
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
  return (state$: Observable<VehicleState>) => state$
    .select(s => s.loading);
}

export function getFoundVehicles() {
  return (state$: Observable<VehicleState>) => state$
    .select(s => s.found);
}
