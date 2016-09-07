/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { LoopBackConfig } from '../../../app.config';
import {
    LoopBackAuth,
    JSONSearchParams,
    BaseLoopBackApi,
    ErrorHandler
} from '../../../core';

import { Profile, LoopBackFilter } from '../../../lib/models';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';

// Making Sure EventSource Type is available to avoid compilation issues.
declare var EventSource: any;

/**
 * Api services for the `Profile` model.
 */
@Injectable()
export class ImageApi extends BaseLoopBackApi {

    constructor(
        @Inject(Http) http: Http,
        @Inject(LoopBackAuth) protected auth: LoopBackAuth,
        @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
        @Optional() @Inject(ErrorHandler) errorHandler: ErrorHandler
    ) {
        super(http, auth, searchParams, errorHandler);
    }

    /**
     * Upload images
     *
     * @param string userId 
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Profile` object.)
     * </em>
     */
    public uploadImages(data, carId: any = undefined) {
        let method: string = "POST";
        let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            `/image/upload/${carId}`;
        let routeParams: any = {
            carId: carId
        };
        let postBody: any = data;      
        let result = this.nativeRequest(method, url, postBody);
        return result;
    }

    public deleteImage(id: any, key: string) {
        let method: string = "POST";
        let url: string = LoopBackConfig.getPath() + "/" + LoopBackConfig.getApiVersion() +
            "/image/remove";
        let postBody: any = { key: key, carId: id };
        let result = this.request(method, url, {}, {}, postBody);
        return result;
    }

    /**
     * The name of the model represented by this $resource,
     * i.e. `Image`.
     */
    public getModelName() {
        return "Image";
    }
}
