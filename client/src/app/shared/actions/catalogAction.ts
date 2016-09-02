import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class CatalogActions {

    static CHANGE_CATALOG = '[APP] CHANGE CATALOG';
    static CHANGE_LOOKUPS = '[APP] CHANGE LOOKUPS';

    changeAppCatalog(catalog: any): Action {
        return {
            type: CatalogActions.CHANGE_LOOKUPS,
            payload: catalog
        };
    }

    setAppLookups(lookups: any): Action {
        return {
            type: CatalogActions.CHANGE_LOOKUPS,
            payload: lookups
        };
    }
}
