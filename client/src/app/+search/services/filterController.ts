import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable()
export class FilterController {
    resetFilter$: ReplaySubject<any> = new ReplaySubject<any>();
}
