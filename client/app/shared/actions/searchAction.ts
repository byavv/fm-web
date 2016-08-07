import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Vehicle } from '../models';

@Injectable()
export class SearchActions {

  static SEARCH = '[Vehicle] Search';
  static SEARCH_COMPLETE_SUCCESS = '[Vehicle] Search Complete Success';
  static SEARCH_COMPLETE_ERROR = '[Vehicle] Search Complete Error';
  static UPDATE = '[Vehicle] FOUND';

  search(query: any): Action {
    return {
      type: SearchActions.SEARCH,
      payload: query
    };
  }

  update(vehicles: Array<any>): Action {
    return {
      type: SearchActions.UPDATE,
      payload: vehicles
    };
  }

  searchComplete(results: Vehicle[]): Action {
    return {
      type: SearchActions.SEARCH_COMPLETE_SUCCESS,
      payload: results
    };
  }

  searchError(error: any): Action {
    return {
      type: SearchActions.SEARCH_COMPLETE_ERROR,
      payload: error
    };
  }
}
