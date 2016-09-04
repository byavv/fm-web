import { Component, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {
    ConverterProvider, convertToView,
    FilterComponent, YearConverter
} from "../../../../../lib/";
import { FilterController } from '../../../../services';

@Component({
    selector: 'yearWrapper',
    template: ` 
    <div class='row'>
        <div class="col-md-12 col-sm-12">    
            <div><strong>First registration (date)</strong></div>  
        </div>
        <div class="col-md-12 col-sm-12">                      
            <form [formGroup]="form" >    
                <div class="row">                     
                      <div class="col-md-6 col-sm-12 padding-shrink-right">
                        <select class="form-control" 
                            name="yearFrom" 
                            id="yearFrom"                            
                            formControlName="yearFrom" 
                            [(ngModel)]="filterValue.yearFrom"
                            #yearFrom>
                                <option value="">Any</option>
                                <option *ngFor="let year of yearsFrom"
                                [class.hidden]="year > yearUp.value && !!yearUp.value"
                                [value]="year">{{year}}</option>            
                         </select> 
                     </div>                  
                     <div class="col-md-6 col-sm-12 padding-shrink-left">
                         <select class="form-control" 
                             name="yearUp" 
                             id="yearUp"                             
                             formControlName='yearUp'
                             [(ngModel)]="filterValue.yearUp"
                             #yearUp>
                             <option value="">Any</option>
                             <option *ngFor="let year of yearsUp"
                                 [class.hidden]="year < yearFrom.value && !!yearFrom.value"
                                 [value]="year">{{year}}</option>                       
                         </select> 
                     </div>                  
                 </div>                              
            </form>
        </div>                 
    </div> 
  `,    
    styles: [
        `
            .hidden {
                display: none; 
            }
        `
    ]
})
@ConverterProvider({
    bindWith: YearConverter
})
export class YearFilterComponent extends FilterComponent {
    @Input()
    active: boolean;
    @Input()
    filterValue: any;
    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    yearFrom: FormControl;
    yearUp: FormControl;
    form: FormGroup;
    yearsUp: Array<number> = [];
    yearsFrom: Array<number> = [];
    constructor(filterController: FilterController) {
        super(filterController)
        this.yearFrom = new FormControl("");
        this.yearUp = new FormControl("");
        this.form = new FormGroup({
            yearFrom: this.yearFrom,
            yearUp: this.yearUp
        });
        for (let i = 1980; i <= new Date().getFullYear(); i++) {
            this.yearsUp.push(i);
            this.yearsFrom.push(i);
        }
    }
    ngAfterViewInit() {
        this.form.valueChanges
            .distinctUntilChanged()
            .subscribe(value => {
                this.changed.next({ filterValue: value, immidiate: true });
            })
    }
    setValue(value) {
        this.filterValue = value;
    }
    get viewValue() {
        return this.filterValue;
    }
}