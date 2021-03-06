import {
    Component, OnInit, OnDestroy,
    Output, Input, EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';
import { FilterController } from '../../../../../services';
import { FilterModel, FilterStateModel } from "../../../../../../lib/models";
import { ConverterBase } from "../../../../../../lib/converters/ConverterBase";
import { Subscription } from "rxjs";
import * as converters from "../../../../../../lib/converters";
import { construct } from "../../../../../../lib/helpers";

@Component({
    selector: 'activeFilters',
    template: require("./activeFilters.html"),
    styles: [require('./component.css')],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveFiltersComponent {
    private _appliedFilters: Array<any> = [];
    private _converters: Array<ConverterBase> = [];
    private _subscription: Subscription;
    
    @Output()
    reset: EventEmitter<any> = new EventEmitter<any>();
    @Input()
    set filters(array: Array<any>) {
        this._appliedFilters = array.map(filter => {
            var converter = this._converters
                .find((converter) => converter.converterId == filter.id);
            return {
                id: filter.id,
                viewValue: converter ? converter.convertToView(filter.value) : "Converter not found"
            };
        })
    }
    get filters() {
        return this._appliedFilters;
    }

    constructor(private filterController: FilterController) {
        let convertersArray = [];
        Object.keys(converters).forEach((key) => {
            convertersArray.push(construct(converters[key]));
        });
        this._converters = convertersArray;
    }

    resetFilter(filterId) {
        var converter = this._converters
            .find((converter) => converter.converterId === filterId);
        var o = {
            [filterId]: converter.resetValue(),
        }
        this.filterController.resetFilter$.next(o);       
    }
    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}