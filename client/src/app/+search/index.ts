import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarFilterPanelComponent } from './components/regularSearch/filterPanel/panelBase';
import { SEARCH_SERVICES_PROVIDERS } from './services';

import { CarsListComponent } from './components/regularSearch/resultsPanel/carList/carList';
import { PaginationComponent } from './components/regularSearch/resultsPanel/pageSelector/searchPagination';
import { StateFullComponent } from './components/regularSearch/resultsPanel/filterStatePanel/stateFull';
import { StateSummaryPanel } from './components/regularSearch/resultsPanel/filterStatePanel/stateSummary';
import { LastAddedComponent } from './components/regularSearch/lastAddedPanel/lastAdded';
import { CarsSearchComponent } from './components/regularSearch/searchBase';
import { SearchBase } from './components/searchBase';
import { CarDetailsComponent } from './components/carDetails/carDetails';
import { SEARCH_DIRECTIVES } from "./directives/";

import { PaginationModule, DropdownModule, CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';
import { SharedModule } from '../shared';
import { SortPipe } from './pipes/sortPipe';

export const routes: Routes = [
  {
    path: '',
    component: SearchBase,
    children: [
      { path: '', component: CarsSearchComponent, pathMatch: 'full' },
      { path: 'details/:id', component: CarDetailsComponent },
      // TODO: not implemented yet
      // { path: 'advanced', component: AdvancedSearchComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  declarations: [
    CarsListComponent,
    CarFilterPanelComponent,
    StateFullComponent,
    PaginationComponent,
    StateSummaryPanel,
    LastAddedComponent,
    ...SEARCH_DIRECTIVES,

    SortPipe
  ],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
    CarouselModule,
    PaginationModule,
    DropdownModule
  ],
  providers: [
    SEARCH_SERVICES_PROVIDERS
  ],
})
export default class SearchModule {

}
