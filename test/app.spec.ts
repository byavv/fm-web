import {
    beforeEachProviders,
    inject,
    async,
    it,
    beforeEach, fakeAsync
} from '@angular/core/testing';

import { BaseRequestOptions, Http } from '@angular/http';
import { Router } from '@angular/router';
import { MockBackend } from '@angular/http/testing';
import { provide } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs";
import { MockRouter, MockAppController } from './helpers/mocks';
import { ACTIONS_PROVIDERS } from "../client/app/shared/actions";

import { Store, provideStore } from '@ngrx/store';
import reducer from '../client/app/shared/reducers';
import {getCatalogReady} from '../client/app/shared/reducers'

let appControllerStart: jasmine.Spy;

var fakeStorageValue = JSON.stringify({ token: 'fakeToken' });

// Load the implementations that should be tested
import { App } from '../client/app/app';
import {Identity, Storage, APP_SERVICES_PROVIDERS, AppController} from "../client/app/shared/services";

describe('App', () => {
    // provide our implementations or mocks to the dependency injector
    beforeEachProviders(() => [
        APP_SERVICES_PROVIDERS,
        App,
        provide(Router, { useFactory: () => new MockRouter() }),
        provide(AppController, { useFactory: () => new MockAppController() }),
        BaseRequestOptions,
        MockBackend,
        // Provide a mocked (fake) backend for Http
        provide(Http, {
            useFactory: function useFactory(backend, defaultOptions) {
                return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
        }),
        provideStore(reducer),
        ACTIONS_PROVIDERS
    ]);
    beforeEach(inject([AppController, Identity, Storage], (appController, identity, storage) => {
        spyOn(appController, "start").and.callThrough();
        spyOn(storage, "getItem").and.returnValue(fakeStorageValue);
        spyOn(identity, "update").and.callThrough();
    }));

    it('app should initialize', async(inject([App, Identity, Storage, AppController, Store], (app, identity, storage, appController, store) => {
        expect(app).toBeTruthy();
        store
            .let(getCatalogReady())
            .subscribe(value => {
                expect(appController.start).toHaveBeenCalled();
                expect(value.makers).toBeDefined();
                expect(storage.getItem).toHaveBeenCalledWith('authorizationData');
                expect(identity.update).toHaveBeenCalledWith(JSON.parse(fakeStorageValue));
            });
    })));
});