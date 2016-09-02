import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarFilterPanelComponent } from './filterPanel/panelBase';
import { SEARCH_SERVICES_PROVIDERS } from './services';

import { CarsListComponent } from './components/regularSearch/resultsPanel/carList/carList';
import { PaginationComponent } from './components/regularSearch/resultsPanel/pageSelector/searchPagination';
import { StateFullComponent } from './components/regularSearch/resultsPanel/filterStatePanel/stateFull';
import { StateSummaryPanel } from './components/regularSearch/resultsPanel/filterStatePanel/stateSummary';
import { LastAddedComponent } from './components/regularSearch/lastAddedPanel/components/lastAdded';
import { CarsSearchComponent } from './components/regularSearch/searchBase';
import { SEARCH_DIRECTIVES } from "./directives/";


export const routes = [
  { path: '', component: CarsSearchComponent, pathMatch: 'full' },
  { path: 'search/:maker', component: CarsSearchComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    CarsListComponent,
    CarFilterPanelComponent,
    StateFullComponent,
    PaginationComponent,
    StateSummaryPanel,
    LastAddedComponent,
    ...SEARCH_DIRECTIVES
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    SEARCH_SERVICES_PROVIDERS
  ]
})
export default class RegularSearchModule {

}
