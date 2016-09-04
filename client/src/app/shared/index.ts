import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

import { SHARED_SERVICES } from './services';
import { SHARED_COMPONENTS } from './components';
import { SHARED_DIRECTIVES } from "./directives";
import { GUARDS } from "./guards";
import { ACTIONS_PROVIDERS } from "./actions";

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    RouterModule    
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
    CommonModule,
    FormsModule
  ],
  providers: [
    ...SHARED_SERVICES,
    ...ACTIONS_PROVIDERS,
    ...GUARDS,
  ]
})
export class SharedModule {

}
