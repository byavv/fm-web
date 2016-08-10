import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class QueryActions {

  static CONVERT_FROM_ROUTE = '[QUERY] CONVERT FROM VALUE';
  static UPDATE_VALUE = '[QUERY] UPDATE NEW VALUE';
 
  // update value and navigate
  updateStateFromFilterChange(value: any): Action {
    return {
      type: QueryActions.UPDATE_VALUE,
      payload: value
    };
  }

  updateStateFromRouteParams(params: any): Action {
    return {
      type: QueryActions.CONVERT_FROM_ROUTE,
      payload: params,      
    };
  }
}
