import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Catalog } from '../models';

@Injectable()
export class CatalogActions {
    
  static SET = '[Catalog] Set';

  setCatalog(query: any): Action {
    return {
      type: CatalogActions.SET,
      payload: query
    };
  }
}
