import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class QueryActions {

  static UPDATE = 'Update query';
  update(query: string): Action {
    return {
      type: QueryActions.UPDATE,
      payload: query
    };
  } 
}
