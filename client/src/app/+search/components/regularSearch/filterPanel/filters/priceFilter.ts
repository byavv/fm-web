import {
    Component, EventEmitter,
    Input, Output, AfterViewInit,
    OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {
    ConverterProvider, convertToView,
    FilterComponent, IFilterComponent, PriceConverter
} from "../../../../../lib/";
import { PatternInput, DebounceInput } from "../../../../../shared/directives";
import { FilterController } from '../../../../services';

@Component({
    selector: 'priceWrapper',
    template: ` 
    <div class='row'>
        <div class="col-md-12 col-sm-12">   
             <div><strong>Price</strong></div> 
        </div>  
        <div class="col-md-12 col-sm-12">  
            <form [formGroup]="form" >    
                 <div class="row">                                 
                     <div class="col-md-6 col-sm-12 padding-shrink-right">
                         <input-wrapper 
                             [delay]='500' 
                             css='form-control'
                             pattern="[0-9]"                              
                             placeholder='From' 
                             only="[0-9]"                             
                             formControlName="priceFrom" 
                             [(ngModel)]="filterValue.priceFrom">
                         </input-wrapper>
                     </div>                  
                     <div class="col-md-6 col-sm-12 padding-shrink-left">
                         <input-wrapper 
                             [delay]='500' 
                             css='form-control'
                             pattern="[0-9]"                              
                             placeholder='Up' 
                             only="[0-9]"                             
                             formControlName="priceUp" 
                             [(ngModel)]="filterValue.priceUp">
                         </input-wrapper>
                     </div>                 
                 </div>               
            </form>
        </div>                 
    </div>  
  `
})
@ConverterProvider({
    bindWith: PriceConverter
})
export class PriceFilterComponent extends FilterComponent implements IFilterComponent {
    @Input()
    active: boolean;
    @Input()
    filterValue: any = {};
    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    priceFrom: FormControl = new FormControl();
    priceUp: FormControl = new FormControl();
    form: FormGroup;
    pricesUp: Array<number> = [];
    pricesFrom: Array<number> = [];

    constructor(filterController: FilterController) {
        super(filterController)
        this.form = new FormGroup({
            priceFrom: this.priceFrom,
            priceUp: this.priceUp
        });
    }
    ngAfterViewInit() {
        this.form.valueChanges
            .distinctUntilChanged()
            .subscribe(value => {
                this.changed.next({ filterValue: value, immidiate: true });
            });
    }
    viewValue() {
        return this.filterValue;
    }
    setValue(value) {
        this.filterValue = value;
    }
}