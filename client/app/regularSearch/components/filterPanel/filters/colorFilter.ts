import {Component, EventEmitter, Input, Output} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES, FormGroup, FormControl} from '@angular/forms';
import {ConverterProvider, convertToView, FilterComponent, ColorConverter} from '../../../../shared/lib/';
import {FilterController} from '../../../services/filterController';
import {ColorPickerControl} from "../../../../shared/components/controls/colorPicker/colorPicker";

@Component({
    selector: 'color-filter',
    template: `
       <div class="row">           
            <div class="col-md-12 col-sm-12">
               <div><strong>Color (exterior)</strong></div>
               <span>{{viewValue}}</span>
               <a href="" class="pull-right open-link" (click)="opened = !opened">change</a>
            </div>          
            <div *ngIf='opened' class="col-md-12 col-sm-12"> 
                <div [formGroup]='form'>            
                    <colorPicker
                        [ngModel]="filterValue.colors"
                        formControlName="colors">
                    </colorPicker>    
                </div>
            </div>                
      </div>
  `,
    directives: [REACTIVE_FORM_DIRECTIVES, ColorPickerControl]
})
// (onChange)="onColorSelected($event)" 
@ConverterProvider({
    bindWith: ColorConverter
})
export class ColorFilterComponent extends FilterComponent {
    @Input()
    active: boolean;
    @Input()
    filterValue: any = {};
    @Output()
    changed: EventEmitter<any> = new EventEmitter();
    form: FormGroup;
    colors: FormControl = new FormControl([])
    constructor(filterController: FilterController) {
        super(filterController);
        this.form = new FormGroup({
            colors: this.colors
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
            .subscribe((value)=>{
                 this.changed.next(value);
            });        
    }
    //onColorSelected(value) {
    //     this.changed.next({ filterValue: this.filterValue, immidiate: true });
    // }
    @convertToView
    get viewValue() {
        return this.filterValue;
    }
    setValue(value) {
        this.filterValue = value;
        this.changed.next({ filterValue: this.filterValue, immidiate: true });
    }
}