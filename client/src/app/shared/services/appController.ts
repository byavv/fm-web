import { Injectable, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ExtHttp } from './extHttp';
import { Store } from "@ngrx/store";
import { EngineTypeApi, MakerApi } from "./custom";
import { ReplaySubject, Observable } from "rxjs";
import { AppState, getEngineTypes } from "../../core/reducers";
import { CatalogActions } from "../../core/actions";

@Injectable()
export class AppController {
    init$: ReplaySubject<any> = new ReplaySubject<any>();
    config: any = {
        apiBase: "https://localhost:3001" //todo get from data
    };
    makers: Array<any> = [];
    engineTypes: Array<any> = [];
    // todo: car colors     
    constructor(private etApi: EngineTypeApi, private MakerApi: MakerApi, private store: Store<AppState>, private _ngZone: NgZone, private catalogActions: CatalogActions) { }
    start() {
        this._ngZone.runOutsideAngular(() => {
            this._loadAppDefaults((defaults) => {
                this._ngZone.run(() => {
                    this.store.dispatch(this.catalogActions.setAppLookups(defaults));
                    this.init$.next(defaults);
                });
                console.log("APPLICATION STARTED");
            })
        });
    }

    _loadAppDefaults(doneCallback: (defaults: any) => void) {
        Observable.zip(
            this.MakerApi.find(),
            this.etApi.find(),
            (makers, engineTypes) => [makers, engineTypes])
            .subscribe(value => {
                [this.makers, this.engineTypes] = value;
                doneCallback({
                    makers: value[0],
                    engineTypes: value[1]
                });
            }, err => {
                console.log(err);
            })
    }
}
