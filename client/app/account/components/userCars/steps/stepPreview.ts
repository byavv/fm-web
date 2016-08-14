import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ShowError} from '../../../directives/showError'

import {RegExpWrapper, print, isPresent} from '@angular/compiler/src/facade/lang';
import {UsersBackEndApi} from '../../../services/usersBackEndApi';
import {ColorPickerControl} from '../../../../shared/components/controls/colorPicker/colorPicker'
import {Car} from '../../../../shared/models';
import {MasterController} from '../../../services/masterController';
import {Observable} from 'rxjs';

@Component({
    selector: 'carPreview',
    template: require("./templates/stepPreview.html"),
    directives: [REACTIVE_FORM_DIRECTIVES],
    styles: [require('./styles/stepInfo.css')]
})
export class StepPreviewComponent implements OnInit {
    @Output()
    next: EventEmitter<any> = new EventEmitter();
    car: Car;
    constructor(private master: MasterController) { }
    ngOnInit() { 
         this.master.error$.subscribe(value => {});      
    }
    onDone() {
        this.next.next(null);
    }
}
