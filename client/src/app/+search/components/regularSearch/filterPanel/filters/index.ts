import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../../shared';

import { MakerFilterComponent } from "./makerFilter";
import { YearFilterComponent } from "./yearFilter";
import { PriceFilterComponent } from "./priceFilter";
import { MilageFilterComponent } from "./milageFilter";
import { ColorFilterComponent } from "./colorFilter";
import { EngineTypeFilterComponent } from "./engineTypeFilter";
import { OptionsFilterComponent } from "./optionsFilter";

export * from "./makerFilter";
export * from "./yearFilter";
export * from "./priceFilter";
export * from "./milageFilter";
export * from "./colorFilter";
export * from "./engineTypeFilter";
export * from "./optionsFilter";

export var allFilters = [
    MakerFilterComponent,
    YearFilterComponent,
    PriceFilterComponent,
    MilageFilterComponent,
    ColorFilterComponent,
    EngineTypeFilterComponent,
    OptionsFilterComponent
]

/*@NgModule({
    declarations: [
        MakerFilterComponent,
        YearFilterComponent,
        PriceFilterComponent,
        MilageFilterComponent,
        ColorFilterComponent,
        EngineTypeFilterComponent,
        OptionsFilterComponent
    ],
    imports: [
        SharedModule
    ]
})
export class FiltersModule {

}
*/