interface ICarOption {
    name: string;
    description: string;
    active?: boolean;
}

import {
    Component, Self, Input,
    forwardRef, EventEmitter, Output,
    Optional, Attribute
} from '@angular/core';
import {
    NgControl, NgModel,
    ControlValueAccessor, NG_VALUE_ACCESSOR
} from '@angular/forms';

import { isString } from '@angular/compiler/src/facade/lang';

@Component({
    selector: 'optionPicker',
    template: require('./template.html'),
    styles: [require('./component.css')],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OptionsPickerControl),
            multi: true
        }
    ]
})

export class OptionsPickerControl implements ControlValueAccessor {
    private _selectedOptions = [];
    private _options = [];
    @Input()
    options: Array<ICarOption>;
    set selectedOptions(arrayOfSelected) {
        this._selectedOptions = arrayOfSelected;
    }
    get selectedOptions(): any {
        return this._selectedOptions;
    }

    ngOnInit() {
        this._options = this.options.map((option) => {
            return this.selectedOptions.indexOf(option.name) > -1
                ? Object.assign(option, { active: true })
                : Object.assign(option, { active: false });
        });
    }

    onCheck(index) {
        this.options[index].active = !this.options[index].active;
        let activeOptions = this._options.filter((option) => option.active);
        let newValue = activeOptions.map((option) => option.name);
        this.onChange.next(newValue);
    }
    /**
     * ControlValueAccessor
     */
    @Output()
    onChange: EventEmitter<any> = new EventEmitter();
    onTouched = () => {
    };
    writeValue(value) {
        this.selectedOptions = value;
    }
    registerOnChange(fn): void {
        this.onChange.subscribe(fn);
    }
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }
}
