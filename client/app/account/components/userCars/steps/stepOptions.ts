import {Component, OnInit, Output, Input, EventEmitter, OnDestroy, Host, Optional} from '@angular/core';
import {Router} from "@angular/router";
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ShowError} from '../../../directives/showError';

import {RegExpWrapper, print, isPresent, isFunction} from '@angular/compiler/src/facade/lang';
import {UsersBackEndApi} from '../../../services/usersBackEndApi';
import {MasterController} from '../../../services/masterController';
import {Observable} from 'rxjs';
import {Car} from '../../../../shared/models';

@Component({
    selector: 'carOptions',
    template: require("./templates/stepOptions.html"),
    directives: [REACTIVE_FORM_DIRECTIVES, ShowError],
    styles: [require('./styles/stepInfo.css')]
})
export class StepOptionsComponent implements OnInit {

    @Output()
    next: EventEmitter<any> = new EventEmitter();
    form: FormGroup;
    options: Array<any> = [];
    car: any = {};
    loading: boolean = false;
    submitted: boolean = false;
    constructor(
        private master: MasterController,
        fb: FormBuilder) {
        this.form = fb.group({

        });
    }

    ngOnInit() {
        this.master.error$.subscribe(value => {
            this.submitted = true;
            this.form.markAsTouched();
        });

        this.form
            .valueChanges
            .distinctUntilChanged()
            .subscribe(value => {
                this.master.options = value;
                this.master.validation['opt'] = this.form.valid;
            });
    }

    onNext() {
        this.submitted = true;
        if (this.form.valid) {
            this.next.next('prv');
        }
    }
}