import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'

import { SHARED_SERVICES } from './services';
import { SHARED_COMPONENTS } from './components';
import { SHARED_DIRECTIVES } from "./directives";

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpModule
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...SHARED_DIRECTIVES,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    ...SHARED_SERVICES   
  ]
})
export class SharedModule {

}
