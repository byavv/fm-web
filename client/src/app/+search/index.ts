import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarFilterPanelComponent } from './components/regularSearch/filterPanel/panelBase';
import { FilterWrapperComponent } from './components/regularSearch/filterPanel/filterWrapper';
import { SEARCH_SERVICES_PROVIDERS } from './services';

import { CarsListComponent } from './components/regularSearch/resultsPanel/carList/carList';
import { CarItemComponent } from './components/regularSearch/resultsPanel/carList/carListItem/carListItem';
import { PaginationComponent } from './components/regularSearch/resultsPanel/pageSelector/searchPagination';
import { StateFullComponent } from './components/regularSearch/resultsPanel/filterStatePanel/stateFull';
import { StateSummaryPanel } from './components/regularSearch/resultsPanel/filterStatePanel/stateSummary';
import { LastAddedComponent } from './components/regularSearch/lastAddedPanel/lastAdded';
import { SearchOptionsComponent } from './components/regularSearch/resultsPanel/filterStatePanel/searchOptions/searchOptions';
import { ActiveFiltersComponent } from './components/regularSearch/resultsPanel/filterStatePanel/activeFilters/activeFilters';
import { PaginationControlsCmp } from './components/regularSearch/resultsPanel/pageSelector/_tempPaginationControl';

import { RegularSearchBase } from './components/regularSearch/regularSearchBase';
import { SearchBase } from './components/searchBase';
import { CarDetailsComponent } from './components/carDetails/carDetails';
import { SEARCH_DIRECTIVES } from "./directives/";

import { PaginationModule, DropdownModule, CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SharedModule } from '../shared';
import { SortPipe } from './pipes/sortPipe';

//import { FiltersModule } from './components/regularSearch/filterPanel/filters'

export const routes: Routes = [
  {
    path: '',
    component: SearchBase,
    children: [
      { path: '', component: RegularSearchBase, pathMatch: 'full' },
      { path: 'details/:id', component: CarDetailsComponent },
      // TODO: not implemented yet
      // { path: 'advanced', component: AdvancedSearchComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [
    SearchBase,
    RegularSearchBase,
    SearchOptionsComponent,
    CarsListComponent,
    CarFilterPanelComponent,
    //TODO: move to ng2-bootstraps's component 
    PaginationComponent,
    CarDetailsComponent,
    PaginationControlsCmp,
    ActiveFiltersComponent,
    FilterWrapperComponent,
    StateFullComponent,
    PaginationComponent,
    StateSummaryPanel,
    LastAddedComponent,
    CarItemComponent,
    ...SEARCH_DIRECTIVES,

    SortPipe
  ],
  imports: [
    SharedModule,

   // FiltersModule,
    //CommonModule,
    //ReactiveFormsModule,
    RouterModule.forChild(routes),
    CarouselModule,
    PaginationModule,
    DropdownModule
  ],
  providers: [
    ...SEARCH_SERVICES_PROVIDERS
  ],
})
export default class SearchModule {
  static routes = routes;
}
