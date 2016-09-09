import { Component, OnInit, Output, Input, EventEmitter, OnDestroy, Host, Optional } from '@angular/core';
import { Router } from '@angular/router';

import { ShowError } from '../../../directives/showError';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { print, isPresent, isFunction } from '@angular/compiler/src/facade/lang';

import { AppState, getCatalogState, getCatalogReady } from "../../../../core/reducers";
import { CatalogActions } from "../../../../core/actions";
import { Store } from '@ngrx/store';

import { MakerApi, AppController } from '../../../../shared/services';
import { ColorPickerControl } from '../../../../shared/components/controls/colorPicker/colorPicker';
import { MasterController } from '../../../services/masterController';
import { Observable } from 'rxjs';
import { Car } from '../../../../lib/models';
import { UiPane } from '../../../directives/uiTabs';

@Component({
    selector: 'carInfo',
    template: require("./templates/stepInfo.html"),
    styles: [require('./styles/stepInfo.css')]
})
export class StepInfoComponent implements OnInit {
    @Output()
    next: EventEmitter<any> = new EventEmitter();
    form: FormGroup;
    makers = [];
    models = [];
    engineTypes = [];
    colors = [];
    car: any = {};
    model: any;
    maker: any;
    modelToUpdate: string;
    loading: boolean = false;
    submitted: boolean = false;
    constructor(
        private master: MasterController,
        fb: FormBuilder,
        private makersApi: MakerApi,
        private store: Store<AppState>,
        private catalogActions: CatalogActions) {
        this.form = fb.group({
            maker: ['', Validators.required],
            model: ['', Validators.required],
            milage: [0, Validators.required],
            year: [0, Validators.required],
            color: ["", Validators.required],
            price: [0, Validators.compose([Validators.required])],
            description: [""]
        });
    }

    ngOnInit() {
        this.master.validation['info'] = true;
        this.master.error$.subscribe(value => {
            console.log("ERROR", value)
            this.submitted = true;
            this.form.markAsTouched();
        });
        this.store
            .let(getCatalogReady())
            .do(() => { this.loading = true })
            .subscribe((defaults) => {
                this.makers = defaults.makers || [];
                this.engineTypes = defaults.engineTypes || [];
                this.master.init$.subscribe((car: Car) => {
                    this.loading = false;
                    this.car = car;
                    if (this.car.makerId && this.car.carModelId) {
                        this.modelToUpdate = this.car.carModelId;
                        this.maker = this.makers
                            .find((maker) => maker.id == this.car.makerId);
                    }
                })
            }, console.error);

        this.form
            .valueChanges
            .distinctUntilChanged()
            .subscribe(value => {
                this.master.info = value;
                this.master.validation['info'] = this.form.valid;
            });
    }
    ngAfterViewInit() {
        this.form
            .controls["maker"]
            .valueChanges
            .filter(value => value)
            .do(() => { this.loading = true })
            .switchMap(value => !!value.id ? this.makersApi.getCarModels(value.id) : Observable.of([]))
            .subscribe((models: Array<any>) => {
                this.loading = false;
                this.models = models;
                if (this.modelToUpdate) {
                    this.model = models.find((model) => model.id == this.modelToUpdate);
                    this.modelToUpdate = null;
                }
            });
    }

    onSubmit(form: FormGroup) {
        this.submitted = true;
        if (form.valid) {
            this.next.next('img');
        }
    }
}
