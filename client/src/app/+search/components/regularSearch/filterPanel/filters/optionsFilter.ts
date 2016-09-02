import {Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from '@angular/forms';
import {ConverterProvider, convertToView, FilterComponent, OptionsConverter} from '../../../../shared/lib/';
import {OptionsPickerControl} from "../../../../shared/components/controls/optionPicker/optionPicker";
import {FilterController} from '../../../services/filterController';

@Component({
    selector: 'option-filter',
    template: `      
      <div class="row">
         <div class="col-md-12  col-sm-12">
              <div><strong>Options</strong></div>
              <span>{{viewValue}}</span>
              <a href="" class="pull-right open-link" (click)="opened = !opened">change</a>
         </div>
         <div *ngIf='opened'>
             <div [formGroup]='form'>
                <div class="col-md-12  col-sm-12 box-content">              
                    <optionPicker
                        [options]="defaults"                
                        [ngModel]="filterValue.options"
                        formControlName="options">
                    </optionPicker>
                </div> 
             </div>
         </div>
    </div>
  `,
    directives: [REACTIVE_FORM_DIRECTIVES, OptionsPickerControl],
    styles: [`
        :host >>> .control-container > div {      
            flex: 1 0 100%!important;            
        }
    `]

})

@ConverterProvider({
    bindWith: OptionsConverter
})
export class OptionsFilterComponent extends FilterComponent {
    @Input()
    active: boolean;
    @Input()
    filterValue: any;
    @Output()
    changed: EventEmitter<any> = new EventEmitter();

    form: FormGroup;
    options: FormControl = new FormControl([]);
    defaults: Array<any> = [
        { name: 'op1', description: 'super-option' },
        { name: 'op2', description: 'super-option2' },
        { name: 'op2', description: 'super-option3' },
        { name: 'op2', description: 'super-option4' },
        { name: 'op2', description: 'super-option5' },
        { name: 'op2', description: 'super-option6' },
        { name: 'op2', description: 'super-option7' },
        { name: 'op2', description: 'super-option8' },
        { name: 'op2', description: 'super-option9' },
        { name: 'op2', description: 'super-option10' }
    ];
    
    constructor(filterController: FilterController) {
        super(filterController);
        this.form = new FormGroup({
            options: this.options
        })
    }

    ngOnInit() {
        this.form.valueChanges
            .map(value => {
                return {
                    filterValue: value,
                    immidiate: true
                }
            })
            .subscribe(this.changed)
    }

    onOptionSelected(value) {
        this.changed.next({ filterValue: this.filterValue, immidiate: true });
    }
    @convertToView
    get viewValue() {
        return this.filterValue;
    }
    setValue(value) {
        this.filterValue = value;
        this.changed.next({ filterValue: this.filterValue, immidiate: true });
    }
}
