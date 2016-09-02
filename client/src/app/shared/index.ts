import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarFilterPanelComponent } from './filterPanel/panelBase';
import { SHARED_SERVICES } from './services';

import { CarsListComponent } from './components/regularSearch/resultsPanel/carList/carList';
import { PaginationComponent } from './components/regularSearch/resultsPanel/pageSelector/searchPagination';
import { StateFullComponent } from './components/regularSearch/resultsPanel/filterStatePanel/stateFull';
import { StateSummaryPanel } from './components/regularSearch/resultsPanel/filterStatePanel/stateSummary';
import { LastAddedComponent } from './components/regularSearch/lastAddedPanel/components/lastAdded';
import { CarsSearchComponent } from './components/regularSearch/searchBase';
import { SHARED_DIRECTIVES } from "./directives";



@NgModule({
  declarations: [
    CarsListComponent,
    CarFilterPanelComponent,
    StateFullComponent,
    PaginationComponent,
    StateSummaryPanel,
    LastAddedComponent,
    ...SHARED_DIRECTIVES
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ...SHARED_SERVICES
  ],
  providers: [
    SHARED_SERVICES
  ]
})
export default class SharedModule {

}
