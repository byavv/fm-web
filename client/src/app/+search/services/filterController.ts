import {Injectable} from '@angular/core';
import {ReplaySubject, Observable} from 'rxjs';
import {convertFromRoute, convertToRoute, buildFilterListFromRoute} from "../../shared/lib/";
import {ConverterBase} from "../../shared/lib/converters/ConverterBase";

import {FilterModel, FilterStateModel} from "../../shared/models/";

@Injectable()
export class FilterController {
    resetFilter$: ReplaySubject<any> = new ReplaySubject<any>();   
}
