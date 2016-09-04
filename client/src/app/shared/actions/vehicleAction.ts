import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Vehicle } from '../../lib/models';

@Injectable()
export class VehicleActions {
  static SEARCH = '[Vehicle] Search';
  static SEARCH_COMPLETE_SUCCESS = '[Vehicle] Search Complete Success';
  static SEARCH_COMPLETE_ERROR = '[Vehicle] Search Complete Error'; 

  search(query: any): Action {
    return {
      type: VehicleActions.SEARCH,
      payload: query
    };
  }

  searchComplete(results: Vehicle[]): Action {
    return {
      type: VehicleActions.SEARCH_COMPLETE_SUCCESS,
      payload: results
    };
  }

  searchError(error: any): Action {
    return {
      type: VehicleActions.SEARCH_COMPLETE_ERROR,
      payload: error
    };
  }
}
