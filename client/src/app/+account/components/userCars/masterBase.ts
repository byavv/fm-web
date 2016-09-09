import { Component, OnInit, ViewChild, QueryList } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { STEP_COMPONENTS } from "./steps";
import { MasterController } from "../../services/masterController";
import { Car } from "../../../lib/models";
import { UiTabs, UiPane } from '../../directives/uiTabs';
import { isString } from "@angular/compiler/src/facade/lang";
import { Observable } from "rxjs";
import { CarApi, ImageApi } from '../../../shared/services';

@Component({
    selector: "carEdit",
    template: `
    <div class="row">
        <div class="col-md-12 col-sm-12" style="position: relative; min-height: 500px;">           
            <loader [async]='master.init$' [active]='loading' [delay]='100' (completed)='loading=false'></loader>      
            <loader [async]='master.validate$' [active]='loading' [delay]='100' (completed)='loading=false'></loader>      
            <ui-tabs #tab>
                <template ui-pane='info' title="Info" [valid]='master.validation.info'>
                    <carInfo (next)="tab.goTo($event)"></carInfo>
                </template>
                <template  ui-pane='img' title='Images' [valid]='master.validation.img'>
                    <carImages (next)="tab.goTo($event)"></carImages>
                </template>
                <template  ui-pane='opt' title='Options'>
                    <carOptions (next)="tab.goTo($event)"></carOptions>
                </template>
                <template ui-pane='prv' title='Preview'>
                    <carPreview (next)="onDone()"></carPreview>
                </template>
            </ui-tabs>
        </div>
    </div>
    `,
    styles: [require('./steps/styles/master.css'),
        `
    :host >>> .loader-container {
        position: absolute;      
        left: 15px;
        right: 15px;
        top: 0;
        width: auto;
        height:auto;
        bottom: 15px;      
        background: rgba(255, 255, 255, .5);
        z-index: 999;
    }
    `],
    viewProviders: [MasterController]
})

export class MasterBaseComponent {
    @ViewChild(UiTabs) tab: UiTabs;
    id: string;
    loading: boolean = true;
    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private master: MasterController,
        private carApi: CarApi,
        private imageApi: ImageApi) {
    }

    ngOnInit() {
        this.id = this.activeRoute.snapshot.params['id'];
        if (this.id) {
            this.carApi.findById(this.id).subscribe((car: any) => {
                this.master.init$.next(car);
            });
        } else {
            this.master.init$.next(new Car());
        }
    }

    ngAfterViewInit() {
        this.tab.goTo("info");
    }

    onDone() {
        this.master
            .validate$
            .do(() => { this.loading = true; })
            .flatMap(() => {
                return this.id
                    ? this.carApi.updateCurrent(this.id, this.master.info)
                    : this.carApi.createNew(this.master.info);
            })
            .flatMap((result) => {
                console.log(result)
                let form = new FormData();
                this.master.images.forEach((image) => {
                    let file = new File([image.blob], image.name, { type: "image/jpeg" });
                    form.append("images", file, file.name);
                });
                if (result && result.car) {
                    return this.imageApi.uploadImages(form, result.car.id);
                } else {
                    return Observable.throw("car creation error");
                }
            })
            .subscribe((result) => {
                console.log(result);
                //todo
                this.router.navigate(['personal/cars/list']);
            }, (err) => {
                if (isString(err))
                    this.tab.goTo(err);
            });
    }
}
