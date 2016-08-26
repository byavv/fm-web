import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl } from '@angular/forms';
import { ConverterProvider, convertToView, FilterComponent, EngineTypeConverter } from '../../../../shared/lib/';
import { OptionsPickerControl } from "../../../../shared/components/controls/optionPicker/optionPicker";
import { FilterController } from '../../../services/filterController';

import { AppState, getEngineTypes } from "../../../../shared/reducers";
import { QueryActions, FilterPanelActions, CatalogActions } from "../../../../shared/actions";
import { Store } from '@ngrx/store'

@Component({
    selector: 'engine-filter',
    template: `      
      <div class="row">
         <div class="col-md-12 col-sm-12">
              <div><strong>Engine, type</strong></div>
              <span>{{viewValue}}</span>
              <a href="" class="pull-right open-link" (click)="opened = !opened">change</a>
         </div>        
         <div *ngIf='opened' class="col-md-12 col-sm-12 box-content">   
            <div [formGroup]="form">          
                <optionPicker
                    [options]="defaults"                
                    [ngModel]="filterValue.engineTypes"                 
                    formControlName="engineTypes">
                </optionPicker>
             </div> 
         </div>
    </div>
  `,
    directives: [REACTIVE_FORM_DIRECTIVES, OptionsPickerControl],
    styles: [`
         :host >>> .control-container > div {      
            flex: 1 0 50%;            
        }
    `]
})

@ConverterProvider({
    bindWith: EngineTypeConverter
})
export class EngineTypeFilterComponent extends FilterComponent {
    @Input()
    active: boolean;
    @Input()
    filterValue: any;
    form: FormGroup;
    engineTypes: FormControl = new FormControl([]);
    defaults: Array<any> = [];
    constructor(
        filterController: FilterController,
        private store: Store<AppState>,
        private catalogActions: CatalogActions
    ) {
        super(filterController);
        this.form = new FormGroup({
            engineTypes: this.engineTypes
        })
    }

    ngOnInit() {
        this.store.let(getEngineTypes()).subscribe((engineTypes) => {
            this.defaults = engineTypes;
        });
        this.form.valueChanges
            .map(value => {
                return {
                    filterValue: value,
                    immidiate: true
                }
            })
            .subscribe(this.changed);
    }
    @Output()
    changed: EventEmitter<any> = new EventEmitter();

    @convertToView
    get viewValue() {
        return this.filterValue;
    }

    setValue(value) {
        this.filterValue = value;
        this.changed.next({ filterValue: this.filterValue, immidiate: true });
    }
}
