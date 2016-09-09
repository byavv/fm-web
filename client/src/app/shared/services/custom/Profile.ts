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
export class ProfileApi extends BaseLoopBackApi {

  constructor(
    @Inject(Http) http: Http,
    @Inject(LoopBackAuth) protected auth: LoopBackAuth,
    @Inject(JSONSearchParams) protected searchParams: JSONSearchParams,
    @Optional() @Inject(ErrorHandler) errorHandler: ErrorHandler
  ) {
    super(http, auth, searchParams, errorHandler);
  }

 /**
  * <em>
        * (The remote method definition does not provide any description.)
        * </em>
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
  public getProfile(userId: any = undefined) {
    let method: string = "GET";
    let url: string = LoopBackConfig.getPath() + "/private/" + LoopBackConfig.getApiVersion() +
      "/profiles/getProfile";
    let routeParams: any = {};
    let postBody: any = {};
    let urlParams: any = {};
    if (userId) urlParams.userId = userId;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * <em>
         * (Update profile data)
         * </em>
   *
   * @param object data Request data.
   *
   *  - `profile` – `{object}` - 
   *
   *  - `userId` – `{string}` - 
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
  public updateProfile(profile: any = undefined, userId: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/private/" + LoopBackConfig.getApiVersion() +
      "/profiles/updateProfile";
    let routeParams: any = {};
    let postBody: any = profile;
    let urlParams: any = {};
    if (profile) urlParams.profile = profile;
    if (userId) urlParams.userId = userId;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * <em>
         * (The remote method definition does not provide any description.)
         * </em>
   *
   * @param object data Request data.
   *
   *  - `userId` – `{string}` - 
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
  public me(userId: any = undefined) {
    let method: string = "POST";
    let url: string = LoopBackConfig.getPath() + "/private/" + LoopBackConfig.getApiVersion() +
      "/profiles/me";
    let routeParams: any = {};
    let postBody: any = {
      userId: userId
    };
    let urlParams: any = {};
    if (userId) urlParams.userId = userId;
    let result = this.request(method, url, routeParams, urlParams, postBody);
    return result;
  }

  /**
   * The name of the model represented by this $resource,
   * i.e. `Profile`.
   */
  public getModelName() {
    return "Profile";
  }
}
